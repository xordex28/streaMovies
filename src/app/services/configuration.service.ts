import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configuration: object;
  constructor(private http: HttpClient, private apiService: ApiService) {
  }

  async getConfiguration(): Promise<object> {
    if (this.configuration !== undefined) {
      return this.configuration;
    } else {
      this.configuration = await this.http.get(`${this.apiService.url}/configuration`).toPromise();
      return this.configuration;
    }
  }

}
