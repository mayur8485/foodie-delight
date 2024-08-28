import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  form: any;
  restaurantName: string = "";
  editMode: boolean = false;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.router.events.subscribe((value: any) => {
      if (value instanceof NavigationStart) {
        if (value.url.includes("/adminForm/")) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
      }
    })

    this.initForm();

    this.route.params.subscribe((params: Params) => {
      const restaurantData = this.dataService.getRestaurant(+params['id']);
      if (restaurantData) {
        this.editMode = true;
        this.restaurantName = restaurantData["restaurantName"];
        this.onsetRestaurant(restaurantData);
        this.disableFields();
      }
    })
  }

  disableFields() {
    this.form.get('panNumber')?.disable();
    this.form.get('gstNo')?.disable();
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl("", { validators: [Validators.required] }),
      lastName: new FormControl("", { validators: [Validators.required] }),
      panNumber: new FormControl("", { validators: [Validators.required, Validators.pattern('^([A-Z]){5}([0-9]){4}([A-Z]){1}$')] }),
      ownermobileNo: new FormControl("", { validators: [Validators.required] }),
      ownerAddress: new FormControl("", { validators: [Validators.required] }),
      ownerAddress2: new FormControl("", { validators: [Validators.required] }),
      ownerState: new FormControl("", { validators: [Validators.required] }),
      ownerCity: new FormControl("", { validators: [Validators.required] }),
      ownerPincode: new FormControl("", { validators: [Validators.required] }),
      restaurantName: new FormControl(""),
      gstNo: new FormControl(""),
      description: new FormControl(""),
      restaurantAddress: new FormControl(""),
      restaurantAddress2: new FormControl(""),
      restaurantState: new FormControl(""),
      restaurantCity: new FormControl(""),
      restaurantPincode: new FormControl("")
    })


  }

  onsetRestaurant(data: any) {
    this.form.patchValue(data);
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 1000000);
  }

  onAddRestaurant() {
    const data = this.form.getRawValue();
    if (this.form.valid) {
      data["id"] = this.getRandomNumber();
      this.dataService.addRestaurant(data);
      this.router.navigate(['../restaurantList'])
    }
  }

  onEdit() {
    const data = this.form.getRawValue();
    console.log(this.form);
    if (this.form.valid) {
      this.dataService.updateRestaurant(data);
      this.router.navigate(['../restaurantList'])
    }
  }

}
