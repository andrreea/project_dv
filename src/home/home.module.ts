import {NgModule} from '@angular/core';
import {MaterialModule} from "@angular/material";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from "./home.component";
import {ChartsModule} from "../charts/charts.module";
import {NetworkModule} from "../network/network.module";
import {HomeActions} from "./home.actions";
import {HomeStore} from "./home.store";

@NgModule({
    declarations: [HomeComponent],
    //store and actions
    providers: [HomeActions, HomeStore],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ChartsModule,
        NetworkModule
    ]
})
export class HomeModule {

}