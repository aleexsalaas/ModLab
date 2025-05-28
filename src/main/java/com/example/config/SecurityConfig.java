package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.Customizer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    // Constructor con inyección de dependencias
    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // Codificador de contraseñas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuración CORS detallada
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of(
            "https://modlabfront.onrender.com"
            // ,"http://localhost:4200"
        ));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(source);
    }

    // Configuración de seguridad
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenProvider);

        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/modlab/User/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/modlab/User/users").permitAll()
                // CORRECCIÓN AQUÍ: Añadimos explícitamente "/modlab/CPU"
                .requestMatchers(HttpMethod.GET, "/modlab/CPU", "/modlab/CPU/**", "/modlab/User/*").permitAll()
                .requestMatchers(HttpMethod.GET, "/modlab/Review/product/{productId}").permitAll()
                .requestMatchers(HttpMethod.GET, "/modlab/products/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/generate-token").permitAll()
                .requestMatchers(HttpMethod.POST, "/modlab/Review/**", "/modlab/ShippingAddress/**", "/modlab/paymentMethod/**", "/modlab/order/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/modlab/**").authenticated()
                .requestMatchers("/modlab/ShippingAddress/**", "/address", "/address/add", "/profile", "/email/**", "/modlab/Review").authenticated()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}