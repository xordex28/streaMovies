import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listTrending: object[];
  configuration: object = {};
  mostPopular: object = {};
  constructor(private movieService: MoviesService, private configService: ConfigurationService, private userService:UserService) { }

  async ngOnInit(): Promise<void> {
    this.configuration = await this.configService.getConfiguration();
    console.log(this.configuration);

    await this.getTrending();
    console.log(this.listTrending);

    console.log(this.userService.getFavorites());
  }

  getTrending = async () => {
    this.listTrending = await this.movieService.getTrending('all', 'day').toPromise();
    this.mostPopular = { ...this.listTrending['results'][0], url: this.buildUrlImage(this.listTrending['results'][0]['backdrop_path'], 'original', 'secure_base_url') };
    console.log(this.mostPopular);
  }

  buildUrlImage(url: string, dimentions: string, property: string) {
    let urlM = this.configuration['images'][property];
    urlM = urlM + dimentions + url;
    return urlM;
  }

  addFavorite(movie:object){
    console.log('hoaaa');
    this.userService.addFavorite(movie);
    console.log(this.userService.getFavorites());
  }
}
