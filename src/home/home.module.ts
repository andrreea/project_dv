import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from "./home.component";

@NgModule({
    declarations: [HomeComponent],
    //store and actions
    providers: [],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ]
})
export class HomeModule {

}