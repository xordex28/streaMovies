import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  myFavorites: object[];
  getFavorites() {

    this.myFavorites = !(localStorage.getItem('favorite')) ? [] : JSON.parse(localStorage.getItem('favorite'));
    return this.myFavorites;
  }

  addFavorite(movie: object): void {
    if (localStorage.getItem('favorite')) {
      this.myFavorites.push(movie);
      localStorage.setItem('favorite', JSON.stringify(this.myFavorites));
    } else {
      this.myFavorites.push(movie);
      localStorage.setItem('favorite', JSON.stringify(this.myFavorites));
    }
  }

  removeFavorite(idMovie: number): void {
    if (localStorage.getItem('favorite')) {
      let index = this.myFavorites.findIndex((current) => current['id'] === idMovie);
      if (index >= 0) {
        this.myFavorites.splice(index, 1);
        localStorage.setItem('favorite', JSON.stringify(this.myFavorites));
      }
    }
  }
}
