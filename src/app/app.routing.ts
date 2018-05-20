﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AgentComponent } from './agent/index';
import { DeliveryComponent } from './delivery/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'agent', component: AgentComponent },
    { path: 'agent/:user', component: AgentComponent, pathMatch: 'full' },
    { path: 'delivery', component: DeliveryComponent },
    { path: 'delivery/:delivery', component: DeliveryComponent, pathMatch: 'full' },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
