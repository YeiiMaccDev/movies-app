import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../interfaces/movie';
import { environment } from '../../../environments/environment.development';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { ActivatedRoute } from '@angular/router';


const imgUrl = environment.imgUrl;

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MovieCardComponent],
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

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.movieType = params['movieType'] || 'popular';
      console.log(this.movieType);
      this.loadAllMovies();
    });
  }

  loadAllMovies() {
    this._movieService.getAllPopularMovies().subscribe({
      next: (resp: any) => {
        this.movies = resp.results as IMovie[];
        console.log(resp.results);
      },
      error: (error) => console.log('Error feching movies: ' + error)
    });
  }

}
