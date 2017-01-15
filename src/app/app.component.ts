import {Component} from "@angular/core";

@Component({
    selector: "demo-app",
    styles: [".active { font-weight: bold; }"],
    template: `<ul class="nav nav-pils"><li role="presentation"><a routerLink="home" routerLinkActive="active">Home </a></li></ul>
    <div> my first app </div>
    <router-outlet></router-outlet>
    `
    })

export class AppComponent {
}