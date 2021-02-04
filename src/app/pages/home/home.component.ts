import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mostPopular: object = {};
  listTrending: object[];
  listTrendingMap: {
    path: string
  }[];
  listTrendingTv: object[];
  listTrendingTvMap: {
    path: string
  }[];

  mostAcclaimed: object[];
  configuration: object = {};



  constructor(private movieService: MoviesService, private configService: ConfigurationService, private userService: UserService, private route: Router) { }

  async ngOnInit(): Promise<void> {
    this.configuration = await this.configService.getConfiguration();
    await this.getTrending();
    await this.getSerieTrending();
    await this.getMostAcclaimed();
  }

  getTrending = async () => {
    const data = await this.movieService.getTrending('all', 'day').toPromise();
    this.listTrending = [...data['results'].slice(0, 10)];
    this.listTrendingMap = this.listTrending.map((current) => {
      return { 'path': this.buildUrlImage(current['poster_path'], 'w154', 'secure_base_url') }
    });
    this.mostPopular = { ...this.listTrending[0] };
    this.mostPopular['backdrop_path'] = this.buildUrlImage(this.mostPopular['backdrop_path'], 'original', 'secure_base_url');
    this.mostPopular['poster_path'] = this.buildUrlImage(this.mostPopular['poster_path'], 'original', 'secure_base_url');

  }

  getSerieTrending = async () => {
    const data = await this.movieService.getTrendingTv().toPromise();
    this.listTrendingTv = [...data['results'].slice(0, 10)];
    this.listTrendingTvMap = this.listTrendingTv.map((current) => {
      return { 'path': this.buildUrlImage(current['poster_path'], 'w154', 'secure_base_url') }
    });
  }

  getMostAcclaimed = async () => {
    const data = await this.movieService.getTopRated().toPromise();
    this.mostAcclaimed = [...data['results'].slice(0, 4)];
    this.mostAcclaimed = this.mostAcclaimed.map((current) => {
      return { ...current, url: this.buildUrlImage(current['poster_path'], 'original', 'secure_base_url') }
    });
  }

  buildUrlImage = (url: string, dimentions: string, property: string) => {
    let urlM = this.configuration['images'][property];
    urlM = urlM + dimentions + url;
    return urlM;
  }

  addFavorite = (movie: object) => {
    console.log('hoaaa');
    this.userService.addFavorite(movie);
    console.log(this.userService.getFavorites());
  }

  goToMovie = (id: number) => {
    this.route.navigate(['detail', id]);
  }

  getEvent = (event: any) => {
    console.log(event);
  }
}
