import {Component, ViewChild} from "@angular/core";

@Component({
    selector: "home-app",
    templateUrl: "home.html"
})
export class HomeComponent {
    @ViewChild("left") leftMenuComponent: any;
    @ViewChild("right") rightMenuComponent: any;

    inputData = [
        {
            "name": "Germany",
            "value": 8940000
        },
        {
            "name": "USA",
            "value": 5000000
        },
        {
            "name": "France",
            "value": 7200000
        }
    ];


}