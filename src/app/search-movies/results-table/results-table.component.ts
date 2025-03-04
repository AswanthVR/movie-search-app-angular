import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieService } from '../../movie.service'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { HighlightDirective } from '../../highlight.directive';
import { SearchComponent } from "../search/search.component"; 
import { DxDataGridModule } from 'devextreme-angular';
import { jsPDF } from 'jspdf';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [CommonModule,DxDataGridModule, MatProgressSpinnerModule, RouterModule, FormsModule, HighlightDirective, SearchComponent],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.scss'
})
export class ResultsTableComponent {
  loading = false;
  tableView = true;
  movies: any[] = [];
  filteredMovies: any[] = []; 
  searchPerformed = false;
  searchTerm: string = '';
  filterTitle:string= '';
  filterType :string = '';

  sortOrder: { [key: string]: 'asc' | 'desc' } = { Title: 'asc', Year: 'asc' };
  private destroy$ = new Subject<void>();
  constructor(private movieService: MovieService, private searchService:SearchService) {}

  ngOnInit() {

    //sbscribe to search query
    this.searchService.searchQuery$
    .pipe(debounceTime(800),takeUntil(this.destroy$))
    .subscribe((query)=>{
      if(query.trim()){
        this.onSearch(query);
      }
    })
    // Load cached results if available
    const storedMovies = this.movieService.getStoredMovies();
    const storedSearchTerm = this.movieService.getStoredSearchTerm();

    if (storedMovies.length > 0) {
      this.movies = storedMovies;
      this.searchTerm = storedSearchTerm;
      this.searchPerformed = true;
      this.applyFilters();
    }
  }

  onSearch(searchTerm: string) {
    this.loading = true;
    this.searchPerformed = true;
    this.searchTerm = searchTerm.trim();
    
    this.movieService.searchMovies(searchTerm).subscribe({
      next: (response) => {
        console.log(response);
        this.movies = response.results || [];
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert('Error fetching movies. Please try again later.');
      }
    });
  }
 
  sortMovies(criteria: string) {
    this.sortOrder[criteria] = this.sortOrder[criteria] === 'asc' ? 'desc' : 'asc';
    const orderMultiplier = this.sortOrder[criteria] === 'asc' ? 1 : -1;

    this.movies = [...this.movies].sort((a, b) => {
      if (criteria === 'Year') {
        const yearA = parseInt(a.release_date, 10) || 0;
        const yearB = parseInt(b.release_date, 10) || 0;
        return (yearA - yearB) * orderMultiplier;
      }
      if (criteria === 'title') {
        return a.title.localeCompare(b.title) * orderMultiplier;
      }
      return 0;
    });
  
    this.applyFilters();
  }

  //filters
  applyFilters() {
    console.log('applying filters');
    this.filteredMovies = this.movies.filter((movie) => {
        return(
          (this.filterTitle ? movie.title.toLowerCase().includes(this.filterTitle.toLowerCase()) : true) 
        )
    });
    console.log('filtered movies', this.filteredMovies);
  }

  toggleView() {
    this.tableView = !this.tableView;
  }

  ngOnDestroy() { 
    this.destroy$.complete();
  }

  getMoviePoster(movie: any): string {
    return movie?.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : 'https://placehold.co/200x250?text=Image+Not+Available';
  }

  //export
  onExporting(e: any) {
    alert("Exporting event triggered!"); // Popup to confirm trigger
    console.log("Exporting started...", e);
  
    if (!e || !e.component) {
      console.error("Export event is not properly firing!", e);
      return;
    }
  
    const doc = new jsPDF();
    
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      doc.save("movies.pdf");
      console.log("Export successful");
    }).catch(error => {
      console.error("Export failed:", error);
    });
  
    e.cancel = true; // Prevent default export behavior
  }
  
  
 
  
}
