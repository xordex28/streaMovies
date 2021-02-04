import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route:Router, private movieService: MoviesService, private screen: ActivatedRoute,private configService: ConfigurationService, private userService:UserService) { }
  movies: object[] = [];
  configuration:object;
  async ngOnInit(): Promise<void> {
    this.configuration = await this.configService.getConfiguration();

    this.screen.params.subscribe((params) => {
      this.movieService.search(params['value']).subscribe((resp) => {
        this.movies = [...resp['results']];
        this.movies = resp['results'].map((current)=>{
          let movie = {...current};
          movie['backdrop_path'] = this.buildUrlImage(movie['backdrop_path'], 'original', 'secure_base_url');
          movie['poster_path'] = this.buildUrlImage(movie['poster_path'], 'original', 'secure_base_url');

          return movie;
        })
      });
    });
  }

  buildUrlImage = (url: string, dimentions: string, property: string) => {
    let urlM = this.configuration['images'][property];
    urlM = urlM + dimentions + url;
    return urlM;
  }

  addToFavorite(movie:object){
    this.userService.addFavorite(movie);
  }

  goToMovie = (id: number) => {
    this.route.navigate(['detail', id]);
  }

}
