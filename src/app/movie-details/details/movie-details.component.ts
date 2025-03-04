import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-movie-details',
  imports: [FormsModule, CommonModule,RouterModule],
  styleUrl:'./movie-details.component.scss',
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  trailers: { name: string; safeUrl: SafeResourceUrl }[] = [];

  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovieDetails(movieId).subscribe(response => {
      this.movie = response;
      console.log(this.movie);
      if (response.videos?.results) {
        this.trailers = response.videos.results
          .filter((video: { site: string; type: string }) => video.site === 'YouTube' && video.type === 'Trailer')
          .map((video: { name: any; key: any; }) => ({
            name: video.name,
            safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.key}`)
          }));
      }
    });
  }
}
