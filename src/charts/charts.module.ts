import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChartsComponent} from "./charts.component";
import {NgxChartsModule} from "ngx-charts";


@NgModule({
    imports: [
        CommonModule,
        NgxChartsModule
    ],
    declarations: [
        ChartsComponent
    ],
    providers: [],
    exports: [
        ChartsComponent
    ]
})
export class ChartsModule {

}