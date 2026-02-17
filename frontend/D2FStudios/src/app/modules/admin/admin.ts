import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent {

  private router = inject(Router);

  public onLogout(): void {
    //1. Borramos el token de ambos sitios por seguridad
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    //2. Redireccionamos al login
    this.router.navigate(['/login']);    
  }

}
