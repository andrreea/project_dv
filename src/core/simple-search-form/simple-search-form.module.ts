import {NgModule} from "@angular/core";
import {SimpleSearchFormComponent} from "./simple-search-form.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

@NgModule({
    declarations: [SimpleSearchFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [SimpleSearchFormComponent]
})
export class SimpleSearchFormModule {

}