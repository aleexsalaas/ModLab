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
            "https://modlabfront.onrender.com" // Tu frontend en Render
            // ,"http://localhost:4200"        // Descomenta si quieres permitir localhost para desarrollo
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
            .cors(Customizer.withDefaults()) // Activa CORS con configuración personalizada
            .csrf(csrf -> csrf.disable()) // Desactiva CSRF, ideal para JWT
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.POST, "/modlab/User/login").permitAll() // Permitir login
                .requestMatchers(HttpMethod.POST, "/modlab/User/users").permitAll()
                .requestMatchers(HttpMethod.GET, "/modlab/CPU/**", "modlab/CPU/cpus/{id}", "modlab/User/*").permitAll()
                .requestMatchers(HttpMethod.GET, "/modlab/Review/product/{productId}").permitAll()
                .requestMatchers(HttpMethod.GET, "/modlab/products/**").permitAll()

                .requestMatchers(HttpMethod.GET, "/generate-token").permitAll()
                .requestMatchers(HttpMethod.POST, "/modlab/Review/**", "/modlab/ShippingAddress/**", "/modlab/paymentMethod/**", "/modlab/order/**").authenticated()  // Permitir registro
                .requestMatchers(HttpMethod.DELETE, "modlab/**").authenticated()
                // Permitir registro
                .requestMatchers("/modlab/ShippingAddress/**", "/address", "/address/add", "/profile", "/email/**", "/modlab/Review").authenticated() // Rutas protegidas
                .anyRequest().authenticated() // Todas las demás rutas requieren autenticación
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Añadir el filtro JWT antes de la autenticación por nombre de usuario y contraseña
    
        return http.build();
    }
}
