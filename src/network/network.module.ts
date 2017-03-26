import {NgModule} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {NetworkComponent} from "./network.component";
import {VisualisationsModule} from "../core/visualisations/visualisations.module";

@NgModule({
    declarations: [NetworkComponent],
    imports: [
        CommonModule,
        MaterialModule,
        VisualisationsModule
    ],
    providers: [],
    exports : [NetworkComponent]
})
export class NetworkModule {

}