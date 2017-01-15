import {Component, ViewChild, Inject} from "@angular/core";

@Component({
    selector: "chart",
    templateUrl:"chart.html"
})
export class ChartComponent {
    @ViewChild("left") leftMenuComponent: any;
    @ViewChild("right") rightMenuComponent: any;


}