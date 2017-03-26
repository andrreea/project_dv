import {Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector:"simple-search-form",
    templateUrl: "simple-search-form.html"
})
export class SimpleSearchFormComponent {
    searchInput: string;

    @Output() searchOnTerm: EventEmitter<string> = new EventEmitter<string>();

    searchValue() {
        this.searchOnTerm.emit(this.searchInput);
    }
}