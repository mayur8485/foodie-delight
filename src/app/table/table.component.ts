import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() data: any;

  loading:boolean = true;

  dataChunks: any;
  page: number = 0;
  noOfPages: any = [];
  recordsPerPage: number = 5;
  startIndex: number = 0;

  constructor(private router: Router, private dataService: DataService) {
    this.dataService.dataSubject.subscribe((data) => {
      this.data = data;
      this.loading = false;
      if (this.data) {
        this.noOfPages = Math.ceil(this.data.length / this.recordsPerPage) * 10;
        this.addPagination(1);
      }
    })
  }

  ngOnInit(): void {
    console.log("Onoint")
    this.data = this.dataService.getRestaurants();
    if (this.data) {
      this.loading = false;
      this.noOfPages = Math.ceil(this.data.length / this.recordsPerPage) * 10;
      this.addPagination(1);
    }
  }

  addPagination(page: number) {
    const startIndex = ((page - 1) * this.recordsPerPage);
    const endIndex = startIndex + this.recordsPerPage;
    this.startIndex = startIndex;
    this.dataChunks = this.data.slice(startIndex, endIndex)
  }

  onEdit(id: any, index: any) {
    this.router.navigate(['./adminForm', id])

  }

  onDelete(id: any, index: any) {
    this.dataService.deleteRestaurant(id, index);
  }

}
