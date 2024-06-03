import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../interfaces/movie';
import { Observable } from 'rxjs';


/* url of "The Movie Database" api credentials extracted from Environment*/
const apiUrl = environment.apiUrl;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  /*  Allows the `MovieService` class to make HTTP requests using the `HttpClient` service to communicate with an API.  */
  private _http = inject(HttpClient);

  constructor() { }

  /**
   * getAllPopularMovies makes an HTTP GET request to retrieve popular movies using a specified API key.
   * @returns Return an Observable of type IMovie.
   */
  getAllPopularMovies(): Observable<IMovie> {
    return this._http.get<IMovie>(`${apiUrl}/popular?api_key=${apiKey}`);
  }

  
  /**
   * getAllMoviesByType retrieves all movies of a specified type using an API call.
   * @param {string} type - The `type` parameter is a string that represents the type of movies you want to retrieve. 
   * @returns Return an Observable of type IMovie.
   */
  getAllMoviesByType(type: string): Observable<IMovie> {
    return this._http.get<IMovie>(`${apiUrl}/${type}?api_key=${apiKey}`);
  }

}
