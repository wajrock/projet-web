import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

export function tokenHttpInterceptor(
    req: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> {
    const service = new TokenStorageService(); // Instanciation directe si nécessaire
    const token = service.getToken();
    // Si token absent, envoyer la requête telle quelle
    if (!token) {
      return next(req);
    }
  
    // Injecter le token dans l'en-tête `Authorization`
    const updatedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  
    return next(updatedRequest).pipe(
      tap({
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.error('Token invalide, redirection vers login');
            const router = new Router(); // Rouage simple vers la page de connexion
            router.navigateByUrl('/login');
          }
        },
      })
    );
  }