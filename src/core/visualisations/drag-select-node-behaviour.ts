import * as d3 from "d3";
import {EventEmitter} from "@angular/core";
import {DispatcherPayload} from "../dispatcher/dispatcher";
import {ForceSimulation} from "./force-simulation";

export const NODES_SELECTED_ADD = "NODES_SELECTED_ADD";
export const NODES_SELECTED_RESET = "NODES_SELECTED_RESET";

export class DragSelectNodeBehaviour extends EventEmitter<DispatcherPayload>{
    private selectedNodeIds: string[] = [];

    constructor() {
        super();
    }

    initialize(forceSimulation: ForceSimulation){
        let simulation = forceSimulation.getSimulation();

        return d3.drag().on("start", (d: any) => {
            simulation.stop();

            if (d3.event.sourceEvent.ctrlKey){
                this.emit({
                    type: NODES_SELECTED_ADD,
                    data: d
                })
            } else if (this.selectedNodeIds.indexOf(d.id)=== -1) {
                this.emit({
                    type: NODES_SELECTED_RESET,
                    data: d
                })
            }

        }).on("drag", () => {
                simulation.nodes().filter((node:any) => this.selectedNodeIds.indexOf(node.id) !== -1).forEach((node: any)=>{
                    node.x += d3.event.dx;
                    node.y += d3.event.dy;
                });

            forceSimulation.tick();
        });
    }

    setSelectedNodeIds(ids){
        this.selectedNodeIds =ids;
    }


}