import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  //1. Revisamos si existe el token en el storage (donde lo guardamos en el login)
  //Chequeamos ambos por si las moscas (72h o Sesión)
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token){
    //Si hay token, lo dejamos pasar
    return true;
  }
  else {
    //Si no hay token, redireccionamos al login
    console.warn('Acceso denegado: No hay token activo.');
    router.navigate(['/login']);
    return false;
  } 
};
