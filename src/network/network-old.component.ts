import {Component, OnInit, OnChanges, Input, Output, EventEmitter, Inject, ElementRef} from "@angular/core";
// import {svgAreaProvider} from "../core/visualisations/svg-area.provider";
// import {linkGeneratorProvider} from "../core/visualisations/link-generator.provider";
// import {nodeGeneratorProvider} from "../core/visualisations/node-generator.provider";
// import {forceSimulationProvider} from "../core/visualisations/force-simulation.provider";
// import {Network} from "../core/visualisations/domain";
// import {LinkGenerator, LinkEvents} from "../core/visualisations/link-generator";
// import {NodeGenerator, NodeEvents} from "../core/visualisations/node-generator";
// import {ForceSimulation, ForceSimulationEvents} from "../core/visualisations/force-simulation";
import {Subscription} from "rxjs";

@Component({
    selector: "network",
    // templateUrl: "network.html",
    // providers: [svgAreaProvider, linkGeneratorProvider, nodeGeneratorProvider, forceSimulationProvider]
})
export class NetworkComponent implements OnInit, OnChanges {
    // @Input() networkData: Network;
    @Input() networkData;

    @Output() nodeContextMenuShow = new EventEmitter();
    // @Output() linkContextMenuShow = new EventEmitter();
    // @Output() hoverOverNode = new EventEmitter();
    // @Output() selectedNodesChange = new EventEmitter();

    nodeContextMenuOptions = [
        {label: "View"}
    ];

    private subscription: Subscription;

    // constructor(@Inject(LinkGenerator) private linkGenerator,
    //             @Inject(ElementRef) private element,
    //             @Inject(NodeGenerator) private nodeGenerator,
    //             @Inject(ForceSimulation) private simulation) {
    // }

    ngOnInit() {
        console.log("12321");
        // this.subscription = this.simulation.subscribe(event => {
        //     switch (event.type) {
        //         case ForceSimulationEvents.Tick:
        //             this.updateNodesAndLinksPositions();
        //             break;
        //     }
        // });
        //
        // this.element.nativeElement.addEventListener("click", () => this.nodeGenerator.resetSelectedNodes());
        //
        // this.nodeGenerator.subscribe(event => {
        //     switch (event.type) {
        //         case NodeEvents.ContextMenu:
        //             const {x, y} = event.data.event;
        //
        //             this.nodeContextMenuShow.emit({data: event.data.elementData, posiiton: {x, y}});
        //             break;
        //
        //         case NodeEvents.HoverOver:
        //             this.hoverOverNode.emit(event.data);
        //             break;
        //
        //         case NodeEvents.SelectedNodes:
        //             this.selectedNodesChange.emit(event.data);
        //             break;
        //     }
        // });
        //
        //
        // this.linkGenerator.subscribe(event => {
        //     switch (event.type) {
        //         case LinkEvents.ContextMenu:
        //             const {x, y} = event.data.event;
        //
        //             this.linkContextMenuShow.emit({data: event.data.elementData, position: {x ,y}});
        //             break;
        //     }
        // });
    }

    ngOnChanges() {
        if (this.networkData) {
            this.setData(this.networkData);
        }
    }

    private setData(networkData) {
        console.log(networkData);
        // this.linkGenerator.setData(networkData.links);
        // this.nodeGenerator.setData(networkData.nodes, {
        //     showLabel: true,
        //     allowDrag: true
        // });
        //
        // this.simulation.setData(networkData);
    }

    private updateNodesAndLinksPositions() {
        // this.linkGenerator.drawOnTick();
        // this.nodeGenerator.drawOnTick();
    }

}