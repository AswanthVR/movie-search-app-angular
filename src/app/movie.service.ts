import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // private apiKey = "e5630327";
  // private baseUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}`;
  private apiKey = "8a74771a3f50356f319c372aaa405dc0";
  private baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}`;
  private tmdbBaseUrl = 'https://api.themoviedb.org/3';
  // private detailsUrl = `https://api.themoviedb.org/3/movie/299536?api_key=${this.apiKey}&append_to_response=credits,videos,images,keywords,release_dates,production_companies`;

  private lastSearchTerm: string = "";
  private lastResults: any[] = [];

  constructor(private http: HttpClient) {}

  searchMovies(searchTerm: string): Observable<any> {
    if (this.lastSearchTerm === searchTerm && this.lastResults.length > 0) {
      return new Observable((observer) => {
        // observer.next({ Search: this.lastResults });
        observer.next({ Search: this.lastResults });
        observer.complete(); 
      });
    }

    // return this.http.get<any>(`${this.baseUrl}&s=${searchTerm}`);
    return this.http.get<any>(`${this.baseUrl}&query=${searchTerm}`);
  }

  getStoredMovies(): any[] {
    return this.lastResults;
  }

  getStoredSearchTerm(): string {
    return this.lastSearchTerm;
  }
// omdb
  // getMovieDetails(ImbdId: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}&i=${ImbdId}`);
  // }

  // tmbd
  getMovieDetails(movieId: number): Observable<any> {
    const detailsUrl = `${this.tmdbBaseUrl}/movie/${movieId}?api_key=${this.apiKey}&append_to_response=credits,videos,images,keywords,release_dates,production_companies`;
    return this.http.get(detailsUrl);
  }
}
