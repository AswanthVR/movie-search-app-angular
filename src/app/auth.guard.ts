import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
 
export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('loginData')!==null;

  if(!isLoggedIn){
    alert("Access Denied! please Login to Continue");
    return router.createUrlTree(['/']);
    
  }
  return true;

};
