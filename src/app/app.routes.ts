import { Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { LoginComponent } from './auth/login/login/login.component';
export const routes: Routes = [
    {'path': '', component: InfoComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
]



