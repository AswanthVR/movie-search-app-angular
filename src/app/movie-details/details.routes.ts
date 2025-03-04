import { Routes } from "@angular/router"; 
import { MovieDetailsComponent } from "./details/movie-details.component";
import { CastAndCrewDetailsComponent } from "./cast-and-crew-details/cast-and-crew-details.component";


export const detailsRoutes : Routes=[
    {path:'',component:MovieDetailsComponent},
    {path:'more-info', component:CastAndCrewDetailsComponent}
]