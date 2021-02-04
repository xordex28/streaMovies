import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private movieService: MoviesService, private screen: ActivatedRoute) { }
  movies: object[];
  ngOnInit(): void {
    this.screen.params.subscribe((params) => {
      this.movieService.search(params['value']).subscribe((resp) => {
        this.movies = [...resp['results']];
      });
    });
  }

}
