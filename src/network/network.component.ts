import {Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef} from "@angular/core";
import {svgAreaProvider} from "../core/visualisations/svg-area.provider";
import {linkGeneratorProvider} from "../core/visualisations/link-generator.provider";
import {nodeGeneratorProvider} from "../core/visualisations/node-generator.provider";
import {forceSimulationProvider} from "../core/visualisations/force-simulation.provider";
import {LinkGenerator, LinkEvents} from "../core/visualisations/link-generator";
import {NodeGenerator, NodeEvents} from "../core/visualisations/node-generator";
import {ForceSimulation, ForceSimulationEvents} from "../core/visualisations/force-simulation";
import {Subscription} from "rxjs";
import * as d3 from "d3";
import * as _ from "underscore";


@Component({
    selector: "network",
    templateUrl: "network.html",
    providers: [svgAreaProvider, linkGeneratorProvider, nodeGeneratorProvider, forceSimulationProvider]
})
export class NetworkComponent implements OnInit {
    @Input() colorValue;
    @Input() radiusValue;
    @Input() networkData;

    @Output() nodeContextMenuShow = new EventEmitter();
    @Output() linkContextMenuShow = new EventEmitter();
    @Output() hoverOverNode = new EventEmitter();
    @Output() selectedNodesChange = new EventEmitter();

    nodeContextMenuOptions = [
        {label: "View"}
    ];


    private subscription: Subscription;

    constructor(
        @Inject(LinkGenerator) private linkGenerator,
                @Inject(ElementRef) private element,
                @Inject(NodeGenerator) private nodeGenerator,
                @Inject(ForceSimulation) private simulation) {
    }

    ngOnInit() {
        this.subscription = this.simulation.subscribe(event => {
            switch (event.type) {
                case ForceSimulationEvents.Tick:
                    this.updateNodesAndLinksPositions();
                    break;
            }
        });

        this.element.nativeElement.addEventListener("click", () => this.nodeGenerator.resetSelectedNodes());

        this.nodeGenerator.subscribe(event => {
            switch (event.type) {
                case NodeEvents.ContextMenu:
                    const {x, y} = event.data.event;

                    this.nodeContextMenuShow.emit({data: event.data.elementData, position: {x, y}});
                    break;

                case NodeEvents.HoverOver:
                    this.hoverOverNode.emit(event.data);
                    break;

                case NodeEvents.SelectedNodes:
                    this.selectedNodesChange.emit(event.data);
                    break;
            }
        });


        this.linkGenerator.subscribe(event => {
            switch (event.type) {
                case LinkEvents.ContextMenu:
                    const {x, y} = event.data.event;

                    this.linkContextMenuShow.emit({data: event.data.elementData, position: {x ,y}});
                    break;
            }
        });

    }

    ngOnChanges(changes) {
        let colorValue = (changes.colorValue || {});
        let radiusValue = (changes.radiusValue || {});
        let networkData = (changes.networkData || {});

        if (this.networkData) {
            if (networkData.currentValue !== networkData.previousValue) {
                this.setData(this.networkData);
            }
            if (colorValue.currentValue !== colorValue.previousValue) {
                let domainColor = _.pluck(this.networkData.nodes, colorValue.currentValue);
                let color = d3.scaleOrdinal(d3.schemeCategory10).domain(domainColor);
                this.nodeGenerator.updateColor(color, colorValue.currentValue);

            }

            if (radiusValue.currentValue !== radiusValue.previousValue) {
                let domainRadius = _.pluck(this.networkData.nodes, radiusValue.currentValue);
                let radiusScale = d3.scaleOrdinal().range([5,10]).domain(domainRadius);
                // console.log(radiusValue);

                this.nodeGenerator.updateRadius(radiusScale, radiusValue.currentValue);

            }
        }

    }

    private setData(networkData) {
        this.linkGenerator.setData(networkData.links);
        this.nodeGenerator.setData(networkData.nodes, {
            showLabel: true,
            allowDrag: true,
            addIcon: true
        });

        this.simulation.setData(networkData);
    }

    private updateNodesAndLinksPositions() {
        this.linkGenerator.drawOnTick();
        this.nodeGenerator.drawOnTick();
    }
}