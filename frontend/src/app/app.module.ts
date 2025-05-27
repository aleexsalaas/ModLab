import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AddAddressComponent } from './pages/add-address/add-address.component';
import { ShippingAddressComponent } from './pages/shipping-address/shipping-address.component';
import { CpusComponent } from './pages/cpus/cpus.component';
import { CpuDetailComponent } from './pages/cpu-detail/cpu-detail.component';
import { ShopCartComponent } from './pages/shop-cart/shop-cart.component';
import { ShowAddressComponent } from './pages/show-address/show-address.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { ShowPaymentComponent } from './pages/show-payment/show-payment.component';
import { OrderSummaryComponent } from './pages/order-summary/order-summary.component';
import { PoliticaPrivacidadComponent } from './pages/politica-privacidad/politica-privacidad.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { InfoCookiesComponent } from './pages/info-cookies/info-cookies.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ShippingAddressComponent,
    AddAddressComponent,
    CpusComponent,
    CpuDetailComponent,
    ShopCartComponent,
    ShowAddressComponent,
    PaymentMethodComponent,
    ShowPaymentComponent,
    OrderSummaryComponent,
    PoliticaPrivacidadComponent,
    AboutUsComponent,
    InfoCookiesComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
 // <-- ¡Aquí!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

