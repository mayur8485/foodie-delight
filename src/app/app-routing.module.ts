import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { ChipsComponent } from './chips/chips.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { TableComponent } from './table/table.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/restaurantList',
        pathMatch: 'full'
    },
    {
        path: 'adminForm/:id',
        component: AdminFormComponent
    },
    {
        path: 'adminForm',
        component: AdminFormComponent
    },
    {
        path: 'restaurantList',
        component: TableComponent
    },
    {
        path: 'foodList/:id',
        component: ChipsComponent
    },
    {
        path: 'addFood/:id',
        component: AddFoodComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
