import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route:Router,private toast:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const ModelStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    ModelStateErrors.push(error.error.errors[key]);
                    this.toast.error(error.error.error,error.error.errors[key]);
                  }
                }
                throw ModelStateErrors;
              }
              else{
                this.toast.error(error.error,error.status.toString())
              }
              break;
           
              case 401:
                this.toast.error("Unathorized",error.status.toString())
                break;
                case 404:
                  this.route.navigateByUrl('/not-found');
                  break;
                  case 500:
                    const navigatExtra:NavigationExtras = {state:{error:error.error}};
                    this.route.navigateByUrl('/server-error',navigatExtra);
                    break;
              default:
              console.error('Unhandled error status:', error.status);
              return throwError(() => new Error('An unexpected error occurred'));
          }
        }
        return throwError(() => error);
      })
    );
  }
}
