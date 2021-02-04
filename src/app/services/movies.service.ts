import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  urlApi: string = "";

  constructor(private apiService: ApiService, private http: HttpClient) {
    this.urlApi = this.apiService.url;
  }

  getTopRated(): Observable<object[]> {
    return this.http.get<object[]>(`${this.urlApi}/movie/top_rated`);
  }
  getTrending(mediaType: string, time: string): Observable<object> {
    return this.http.get<object>(`${this.urlApi}/trending/${mediaType}/${time}`);
  }
  getTrendingTv(): Observable<object> {
    return this.http.get<object>(`${this.urlApi}/tv/popular`);
  }

  getMovieId(id:number): Observable<object>{
    return this.http.get<object>(`${this.urlApi}/movie/${id}`);
  }
}
