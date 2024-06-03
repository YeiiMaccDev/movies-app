import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../interfaces/movie';
import { environment } from '../../../environments/environment.development';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../pagination/pagination.component';


const imgUrl = environment.imgUrl;

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MovieCardComponent, PaginationComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {

  /* Implement MovieService to query all popular movies */
  private _movieService = inject(MovieService);
  /* Implement ActivatedRoute to receive the movie type via url parameters. */
  private _route = inject(ActivatedRoute);


  movieType: string = 'popular';
  movies: IMovie[] = [];

  currentPage: number = 1;

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.movieType = params['movieType'] || 'popular';
      this.currentPage = 1;
      console.log(this.movieType);
      this.loadAllMovies();
    });
  }

  loadAllMovies() {
    this._movieService.getAllMoviesByType(this.movieType, this.currentPage).subscribe({
      next: (resp: any) => {
        this.movies = resp.results as IMovie[];
        console.log(resp.results);
      },
      error: (error) => console.log('Error feching movies: ' + error)
    });
  }


  incrementPage(): void {
    this.currentPage++;
    this.loadAllMovies();
    this.scrollToTop();
  }

  decrementPage(): void {
    if (this.currentPage > 2) {
      this.currentPage--;
      this.loadAllMovies();
      this.scrollToTop();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
