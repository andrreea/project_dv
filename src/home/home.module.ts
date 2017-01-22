import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from "./home.component";
// import {NgxChartsModule} from "ngx-charts";
import {ChartsModule} from "../charts/charts.module";

@NgModule({
    declarations: [HomeComponent],
    //store and actions
    providers: [],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        // NgxChartsModule
        ChartsModule
    ]
})
export class HomeModule {

}