import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: number;
  movie: object;
  configuration: object;
  constructor(private screen: ActivatedRoute, private movieService: MoviesService, private configService: ConfigurationService,private userService:UserService) { }

  async ngOnInit(): Promise<void> {
    this.configuration = await this.configService.getConfiguration();
    console.log(this.configuration);
    this.screen.params.subscribe((resp) => {
      this.id = resp['id'];
      this.movieService.getMovieId(this.id).subscribe((mv: object) => {
        this.movie = { ...mv };
        this.movie['backdrop_path'] = this.buildUrlImage(this.movie['backdrop_path'], 'original', 'secure_base_url');
        this.movie['poster_path'] = this.buildUrlImage(this.movie['poster_path'], 'original', 'secure_base_url');
        console.log("movie",this.movie);
      })
    });
  }
  buildUrlImage = (url: string, dimentions: string, property: string) => {
    let urlM = this.configuration['images'][property];
    urlM = urlM + dimentions + url;
    return urlM;
  }

  addToFavorite(){
    this.userService.addFavorite(this.movie);
  }

}
