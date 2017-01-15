import {HttpModule} from '@angular/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './routing';
import {AppConfiguration} from './app.configuration';
import {HomeModule} from "../home/home.module";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        HomeModule
    ],
    providers: [
        appRoutingProviders,
        AppConfiguration
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
