import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  addFood: any;
  url: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value instanceof NavigationStart) {
        this.url = value.url;
        if (value.url.includes("/foodList")) {
          this.addFood = true;
        } else {
          this.addFood = false;
        }
      }
    })
  }

  onAddFood() {
    if(this.url) {
      const id = this.url.split("/")[2];
      this.router.navigate(['./addFood',id])
    }
  }
}
