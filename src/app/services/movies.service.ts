import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  getMovieId(id: number): Observable<object> {
    return this.http.get<object>(`${this.urlApi}/movie/${id}`);
  }

  search(text: string): Observable<object> {
    if(text!==''){
      const params = new HttpParams()
      .set('query', `${text.trim().replace(' ', '+')}`);
    return this.http.get<object>(`${this.urlApi}/search/movie`, { params });

    }else{
      return of([]);
    }
    
  }
}
