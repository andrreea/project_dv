import * as d3 from "d3";
import {EventEmitter} from "@angular/core";
import {DispatcherPayload} from "../dispatcher/dispatcher";
import {RawApiEdge, NetworkNode} from "./domain";

export interface LinkEventEdge extends RawApiEdge {
    source: NetworkNode,
    target: NetworkNode
}

export enum LinkType {
    ARC,
    LINE
}

export enum LinkEvents {
    ContextMenu
}

export class LinkGenerator extends EventEmitter<DispatcherPayload> {
    private linkGroup;
    private linkType;

    constructor(svgGroup, linkType: LinkType =LinkType.LINE) {
        super();

        let domSelection;

        if (linkType === LinkType.LINE) {
            domSelection = ".link";

        } else if (linkType === LinkType.ARC) {
            domSelection = "path";
        }
        this.linkGroup = svgGroup.append("g").attr("class", "links").selectAll(domSelection);
        this.linkType = linkType;
    }

    setData(links) {
        this.linkGroup = this.linkGroup.data(links, (d: any) => {
            if (d) {
                return d.source.id + "-" + d.target.id;
            }
        });
        this.linkGroup.exit().remove();
        let newGroup;

        if (this.linkType === LinkType.LINE) {
            newGroup = this.linkGroup.enter().insert("line", ".link").attr("class", "link");

        } else if (this.linkType === LinkType.ARC) {
            newGroup = this.linkGroup.enter().insert("svg:path").attr("class", "link").attr("marker-end", "url(#arc)");
        }

        this.bindEvents(newGroup);

        this.linkGroup = newGroup.merge(this.linkGroup);
    }

    drawOnTick() {
        if (this.linkType === LinkType.LINE) {
            this.linkGroup.attr("x1", (d: any) => d.source.x);
            this.linkGroup.attr("y1", (d: any) => d.source.y);
            this.linkGroup.attr("x2", (d: any) => d.target.x);
            this.linkGroup.attr("y2", (d: any) => d.target.y);

        } else if (this.linkType === LinkType.ARC) {
            this.linkGroup.attr("d", d => {
                let dx = d.target.x - d.source.x;
                let dy = d.target.y - d.source.y;
                let dr = Math.sqrt(dx*dx + dy*dy);

                return "M" +
                        d.source.x + "," +
                        d.source.y + "A" +
                        dr + "," + dr + "0 0,1 " +
                        d.target.x + "," +
                        d.target.y;
            })
        }
    }

    reset() {
        this.linkGroup.remove();
    }

    private bindEvents(group){
        group.on("contextmenu", (d:LinkEventEdge) => {
            const event = d3.event;

            event.preventDefault();

            this.emit({
                type: LinkEvents.ContextMenu,
                data: {elementData: d, event}
            });
        });
    }
}