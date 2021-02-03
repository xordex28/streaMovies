import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public key:string = "d29953f207f6969c44cbc7ce744c6e67";
  public url:string = "https://api.themoviedb.org/3";
  constructor() { }
}
