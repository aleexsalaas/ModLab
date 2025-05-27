import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
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

export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'address', component: ShippingAddressComponent},
    { path: 'address/add', component: AddAddressComponent},
    { path: 'cpus', component: CpusComponent},
    { path: 'cpus/:id', component: CpuDetailComponent},
    { path: 'user/shopcart', component: ShopCartComponent},
    { path: 'user/show-address', component: ShowAddressComponent},
    { path: 'user/payment', component: PaymentMethodComponent},
    { path: 'user/show-payment', component: ShowPaymentComponent},
    { path: 'user/order-summary', component: OrderSummaryComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'cookies', component: InfoCookiesComponent },




];
