import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { debounceTime, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { MoviesService } from 'src/app/services/movies.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSearchLoader: boolean = false;

  constructor(private userService: UserService, private router: Router, private movieService: MoviesService) { }
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(300),
      tap(() => {
        this.isSearchLoader = true;
      }), switchMap((value => this.movieService.search(value).pipe(
        finalize(() => this.isSearchLoader = false), map((current: object) => {
          let data = [];

          if ('results' in current) {
            data = [...current['results']];
            
          }
          return data;
        })
      ))))
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  gotoFavorite() {
    if (this.userService.getFavorites().length > 0) {
      this.router.navigate(['favorite'])
    }
  }

  onSearch() {
    this.router.navigate(['search', this.myControl.value]);
  }
}
