import * as d3 from "d3";
import {EventEmitter} from "@angular/core";
import {DispatcherPayload} from "../dispatcher/dispatcher";
import {Network} from "./domain";

export enum ForceSimulationEvents {
    Tick
}

const ALPHA = 0.1;

export class ForceSimulation extends EventEmitter<DispatcherPayload> {
    private simulation;
    private forceLink;

    constructor(width: number, height:number) {
        super();

        this.forceLink = d3.forceLink().id((d: any) => d.id);
        let manyBody = d3.forceManyBody();

        manyBody.strength(-300);
        this.forceLink.distance(d => (<any>d).isLeaf ? 70 : 90);

        this.simulation = d3.forceSimulation()
            .force("link", this.forceLink)
            .force("collide", d3.forceCollide(50).strength(0.1))
            .force("charge", manyBody)
            .alpha(ALPHA)
            .force("center", d3.forceCenter(width /2, height /2))
            .on("tick", this.tick.bind(this))
            .stop();
    }

    setData(networkData: Network) {
        this.simulation.nodes(networkData.nodes);
        this.forceLink.links(networkData.links);

        this.simulation.alpha(ALPHA);
        this.simulation.restart();
    }

    tick() {
        this.emit({
            type: ForceSimulationEvents.Tick,
            data: null
        })
    }

    getSimulation() {
        return this.simulation;
    }
}