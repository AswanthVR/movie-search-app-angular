import { Routes } from "@angular/router";
import { ResultsTableComponent } from "./results-table/results-table.component";
import { ResultGridComponent } from "./result-grid/result-grid.component";


export const resultRoutes : Routes=[
    {path:'',component:ResultsTableComponent},
    {path:'grid', component:ResultGridComponent}
]