import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favorites:object[] = [];
  constructor(private route:Router, private userService:UserService,private router:Router) { }

   ngOnInit(): void {
    this.favorites =  [...this.userService.getFavorites()];
    console.log(this.favorites);
  }
  deleteFavorite(id:number){
    this.userService.removeFavorite(id);
    this.favorites = [...this.userService.getFavorites()];
    if(this.favorites.length <= 0){
      this.router.navigate(['/'])
    }
  }

  goToMovie = (id: number) => {
    this.route.navigate(['detail', id]);
  }
}
