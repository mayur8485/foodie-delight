import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: any;

  dataSubject = new Subject<any>();

  constructor(private http: HttpClient) { }

  private put(data: any) {
    console.log('Network call', data);
    this.http.put('https://foodie-delight-efb0c-default-rtdb.asia-southeast1.firebasedatabase.app/fooddelight.json', data)
      .subscribe((response: any) => {
        console.log('response after success networ call')
        console.log(response)
      })
  }

  private get() {
    this.http.get('https://foodie-delight-efb0c-default-rtdb.asia-southeast1.firebasedatabase.app/fooddelight.json').subscribe((response: any) => {
      this.data = response;
      this.dataSubject.next(this.data);
    })
  }

  getRestaurants() {
    if (!this.data) {
      this.get();
      return null
    }
    else {
      return [...this.data];
    }
  }

  getRestaurant(id: any) {
    if (this.data) {
      return this.data.find((element: any) => +element.id === +id);
    }
  }

  getRestaurantName(id: any) {
    if (this.data) {
      const data = this.getRestaurant(id);
      return data["restaurantName"]
    }
  }

  addRestaurant(restaurantData: any) {
    this.data = [...this.data, restaurantData];
    this.put(this.data);
  }

  updateRestaurant(data: any) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (+this.data[i].id === +data["id"]) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      this.data[index] = data;
      this.put(this.data);
    }
  }

  deleteRestaurant(id: any, index: any) {
    this.data.splice(index, 1);
    this.dataSubject.next(this.data);
    this.put(this.data);
  }


  addFood(id: any, food: any) {
    for (let i = 0; i < this.data.length; i++) {
      if (+this.data[i].id === +id) {
        if (!this.data[i]["food"]) this.data[i]["food"] = [];
        this.data[i]["food"].push(food);
        break;
      }
    }
    this.dataSubject.next(this.data);
    this.put(this.data);
  }

}
