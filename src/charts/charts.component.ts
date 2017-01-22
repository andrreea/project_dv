import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Input,
    EventEmitter,
    Output, Inject, Renderer, ElementRef
} from "@angular/core";

export interface ChartBarDataItem {
    name: string;
    value: any;
    selected?: boolean;
}

const BAR_SELECTOR = "bar";

@Component({
    selector: "charts",
    templateUrl: "charts.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent implements OnInit {
    @Input() data: ChartBarDataItem[];
    // @Output() seriesSelectionChange: EventEmitter<ChartBarDataItem[]>= new EventEmitter<ChartBarDataItem[]>();

    chartSize: any[] = [500, 250];
    showXAxis = true;
    showYAxis = true;
    colorScheme = {
        domain: ["#5AA454"]
    };
    activeEntries: ChartBarDataItem [] = [];

    constructor(@Inject(Renderer) private renderer,
                @Inject(ElementRef) private element){
    }

    ngOnInit() {
        this.renderer.listen(this.element.nativeElement, "click", ev => {
            if (!ev.target.classList.contains(BAR_SELECTOR)) {
                this.resetBarSelections();

                // this.seriesSelectionChange.emit([]);
            }
        })
    }

    selectBar (item: ChartBarDataItem) {
        let modified = [];

        console.log(item);

        this.colorScheme = {
            domain: ["#5AA454"]
        }

        this.data.forEach(dataItem => {
            modified.push((<any>Object).assign({
                selected: dataItem.name === item.name
            }, dataItem))
        });

        setTimeout(() => {
            this.activeEntries = [item];
        }, 30);

        // this.seriesSelectionChange.emit(modified);
    }

    private resetBarSelections() {
        setTimeout(() => this.activeEntries=[], 0)
    }
}
