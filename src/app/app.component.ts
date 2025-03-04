import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResultsTableComponent } from './search-movies/results-table/results-table.component';
import { SearchComponent } from './search-movies/search/search.component';
import { MovieDetailsComponent } from './movie-details/details/movie-details.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ResultsTableComponent,SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
[x: string]: any;
  title = 'movie-search-app';
}
