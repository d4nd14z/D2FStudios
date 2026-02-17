import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard'; //Importar el guard

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.routes').then(m => m.LOGIN_ROUTES)
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {   //Si la URL està vacía, nos manda al login por defecto.
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {   //Si el usuario escribe cualquier cosa, o la URL está vacìa, nos manda al login por defecto
        path: '**',
        redirectTo: 'login'
    }
];
