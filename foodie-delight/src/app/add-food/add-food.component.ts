import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {
  form: any;
  restaurantName: string = "";
  imageUploaded: string = "";

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Admin Form")
    this.route.params.subscribe((value: any) => {
      this.restaurantName = this.dataService.getRestaurantName(value?.id);
    })

    this.form = new FormGroup({
      name: new FormControl("", { validators: [Validators.required] }),
      price: new FormControl("", { validators: [Validators.required] }),
      description: new FormControl("", { validators: [Validators.required] }),
      image: new FormControl("", { validators: [Validators.required] })
    })
  }

  showImage(event: any) {
    console.log(event.target.value);
    this.imageUploaded = event.target.value;

  }

  addFood() {
    const data = this.form.getRawValue();
    if (this.form.valid) {
      console.log(data);
      console.log()
      this.route.params.subscribe((value: any) => {
        this.router.navigate(['foodList', value?.id])
        this.dataService.addFood(value?.id, data)
      })
      this.form.reset();
    }
  }


}
