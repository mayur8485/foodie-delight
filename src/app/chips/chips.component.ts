import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {
  data: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6]

  restaurantName: string = "";

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.restaurantName = this.dataService.getRestaurantName(+params['id']);
      this.data = this.dataService.getRestaurant(+params['id']);
    })

  }

}
