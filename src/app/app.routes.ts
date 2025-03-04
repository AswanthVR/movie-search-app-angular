import { Routes } from '@angular/router'; 
import { MovieDetailsComponent } from './movie-details/details/movie-details.component'; 
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard'; 
import { resultRoutes } from './search-movies/result.routes';
import { detailsRoutes } from './movie-details/details.routes';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    // { path: 'result', children:resultRoutes,canActivate:[authGuard] },
    // { path: 'details/:id', children:detailsRoutes ,canActivate:[authGuard]},
    {
        path:'result',
        loadChildren:()=>import('./search-movies/result.routes').then(m=>m.resultRoutes),
        canActivate:[authGuard]
    },
    {
        path:'details/:id',
        loadChildren:()=>import('./movie-details/details.routes').then(m=>m.detailsRoutes),
        canActivate:[authGuard]
    }

   
];
