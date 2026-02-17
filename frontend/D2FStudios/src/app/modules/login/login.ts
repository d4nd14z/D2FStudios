import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    CommonModule, // Habilita directivas básicas (ngIf, ngClass, etc.)
    FormsModule   // Habilita el manejo de formularios   
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  //Inyectamos el servicio de forma limpia
  private authService = inject(Auth);
  private router = inject(Router);
  
  // Variables que el HTML busca vìa [(ngModel)]
  protected username: string = '';
  protected password: string = '';
  protected rememberMe: boolean = false;

  // El mètodo que el HTML busca vía (submit) o (click)
  public onLogin(): void {    
    const loginData = {
      username: this.username,
      password: this.password      
    };
    console.log('Enviando datos al servicio Auth...');

    //Llamada al Servicio
    //Usamos subscribe() porque el servicio devuelve un "Observable"
    //que es como quedarse esperando a que el cartero vuelva de Django.
    this.authService.login(loginData, this.rememberMe).subscribe({
      next: (response) => {
        //Esto se ejecuta si Django dice "OK" (Status 200)
        console.log('!Respuesta de Django recibida!', response);
        alert('Bienvenida al sistema');
        this.username = '';
        this.password = '';
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        //Esto se ejecuta si hay error (Status 401, 500, etc.)
        console.error('Error al iniciar sesión:', err);
        alert('Usuario o contraseña incorrectos');
      }
    });

  }

}//EOC
