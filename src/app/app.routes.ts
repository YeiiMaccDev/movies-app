import { Routes } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
    {path: 'movies', component: MovieComponent},
    {path: 'movies/:movieType', component: MovieComponent},
    {path: 'movie/:movieId', component: MovieDetailsComponent},
    {path: '', redirectTo: '/movies', pathMatch: 'full'},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
