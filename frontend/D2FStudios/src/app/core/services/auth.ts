import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  //Inyectamos el cliente HTTP de Angular 21
  private http = inject(HttpClient);
  //URL de tu API en Django
  private readonly API_URL = 'http://127.0.0.1:8000/apiv1/login/';

  /**
   * Método para validar credenciales
   * @param credentials Objeto con {username, password }
   * @param remember Booleano para la persistencia de 72h
   */
  login(credentials: {username:string; password:string }, remember: boolean): Observable<any> {
    return this.http.post(this.API_URL, credentials).pipe(
      tap({
        next: (response: any) => {
          // 1. Decidimos dónde guardar según el checkbox
          // localStorage = Persiste para tus 72h)
          // sessionStorage = Temporal (se borra al cerrar pestaña)
          const storage = remember ? localStorage : sessionStorage;

          // 2. Si Django nos devuelve el token, lo guardamos
          if (response && response.access) {
            storage.setItem('token', response.access);
            console.log('Sistema: Token almacenado correctamente.');
          }
        },
        error: (err) => {
          //Solo un log para saber si Django rechazó la conexión
          console.error('Sistema: Error en la comunicación con la API', err);
        }
      })
    );
  }



 
}
