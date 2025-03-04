import { HttpInterceptorFn } from "@angular/common/http";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError, Observable, of } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);  

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error("HTTP Error:", error);

      const errorDetails = {
        url: req.url,
        status: error.status,
        statusText: error.statusText,
        message: error.message,
        time: new Date().toISOString(),
      };

      console.log(errorDetails);

      return throwError(() => new Error(error.message));  
    })
  );
};
