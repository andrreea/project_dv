import * as d3 from "d3";
import {EventEmitter} from "@angular/core";
import {DispatcherPayload} from "../dispatcher/dispatcher";
import {DragSelectNodeBehaviour, NODES_SELECTED_ADD, NODES_SELECTED_RESET} from "./drag-select-node-behaviour";
import {ReplaySubject} from "rxjs/Rx";
import {ForceSimulation} from "./force-simulation";

export interface NodeGeneratorOptions {
    showLabel?: boolean;
    allowDrag?: boolean;
    addIcon?: boolean;
}

export enum NodeEvents {
    Click,
    ContextMenu,
    HoverOver,
    SelectedNodes
}

const CIRCLE_RADIUS = 15;
const CIRCLE_MARGIN = 10;
const LABEL_PROPERTY_NAME = "name";
const DECORATOR_COUNTER_ID = "counter";
const DECORATOR_ICON_ID = "icon";
const LABEL_LENGTH = 20;
// const IMG_URL = nodeType => '/img/${nodeType}.svg';
export const NEIGHBOURS_COUNT_PROPERTY = "friends";

export enum DecoratorPosition {
    Center,
    West,
    SouthWest,
    South,
    North,
    NorthEast
}

export class NodeGenerator extends EventEmitter<DispatcherPayload>{
    private nodeGroup;
    private numberOfNodes = 0;
    private options: NodeGeneratorOptions;
    private fSimulation;
    private selectedNodes: any[] = [];
    private dragSelectNodeBehaviour = new DragSelectNodeBehaviour();

    constructor(svgGroup, forceSimulation: ForceSimulation) {
        super ();

        this.nodeGroup = svgGroup.append("g").attr("class", "nodes").selectAll(".node");
        this.fSimulation = forceSimulation;

        this.dragSelectNodeBehaviour.subscribe(({type, data:currentNode}) => {
            switch (type){
                case NODES_SELECTED_ADD:
                    const indexOfMatch = this.selectedNodes.findIndex(s => s.id === currentNode.id);

                    if (indexOfMatch === -1) {
                        this.selectedNodes.push(currentNode);

                    }else {
                        this.selectedNodes.splice(indexOfMatch, 1);

                    }

                    this.updateSelectedNodes();

                    break;
                case NODES_SELECTED_RESET:
                    this.selectedNodes = [currentNode];
                    this.updateSelectedNodes();

                    break;
            }
        })
    }

    setData(nodes, options: NodeGeneratorOptions = null ) {
        this.options = options;
        this.nodeGroup = this.nodeGroup.data(nodes, (d:any) => d.id || (d.is = ++this.numberOfNodes));
        this.nodeGroup.exit().remove();

        this.selectedNodes = [];

        let newGroup: any = this.nodeGroup.enter().append("g");

        newGroup.attr("class", this.addNodeClass)
            .append("circle")
            .attr("class", d=> "nodeCircle")
            .attr("r", () => CIRCLE_RADIUS);
            // .attr("style", () => {return 'fill: blue;';});

        if (this.options.showLabel) {
            newGroup.append("text")
                .attr("dy", "1.6em")
                .text(d => this.ellipsisString(d[LABEL_PROPERTY_NAME]))
                .on("mouseover", (d, index, text) => {
                    d3.select(text[index]).text(d[LABEL_PROPERTY_NAME]);
                })
                .on("mouseout" , (d, index, text) => {
                    d3.select(text[index]).text(this.ellipsisString(d[LABEL_PROPERTY_NAME]));
                })
        }

        // if (this.options.addIcon) {
        //     newGroup.append("svg:image")
        //         .attr("xlink:href", d => "/img/user.svg")
        //         // .attr("xlink:href", d => IMG_URL(d[nodeTypeName].toLowerCase()))
        //         .attr("x", -CIRCLE_RADIUS + CIRCLE_MARGIN)
        //         .attr("y", -CIRCLE_RADIUS + 2 )
        //         .attr("width", 2*(CIRCLE_RADIUS - CIRCLE_MARGIN))
        //         .attr("height", 2*(CIRCLE_RADIUS - CIRCLE_MARGIN));
        // }

        newGroup.call(this.dragSelectNodeBehaviour.initialize(this.fSimulation));

        this.bindEvents(newGroup);

        this.addCounterDecorator(newGroup);
        this.addIconDecorator(newGroup);

        this.nodeGroup = newGroup.merge(this.nodeGroup);

        this.update();

    }

    update() {
        this.nodeGroup.select(`[data-id=${DECORATOR_COUNTER_ID}]`).text(this.counterDecoratorText.bind(this));
        this.nodeGroup.attr("class", this.addNodeClass);
        this.nodeGroup.select("circle").attr("style", () => {return 'fill: blue;';});

    }

    updateColor(colorScheme, colorVarname) {
        this.nodeGroup.select("circle").attr("style", d => {return 'fill: ' + colorScheme(d[colorVarname]) + ';';});
    }

    updateRadius(radius, radiusVarname) {
        if (radiusVarname == "") {
            this.nodeGroup.select("circle").attr("r", () => CIRCLE_RADIUS);
        }
        else {
            this.nodeGroup.select("circle").attr("r", d => {  return  radius(d[radiusVarname]);});

        }
    }

    drawOnTick() {
        this.nodeGroup.attr("transform", d=> "translate(" + d.x +',' + d.y + ")");
    }

    reset() {
        this.nodeGroup.remove();
    }

    getNodeGroup() {
        return this.nodeGroup;
    }

    resetSelectedNodes() {
        this.selectedNodes = [];
        this.updateSelectedNodes();
    }

    private updateSelectedNodes() {
        this.dragSelectNodeBehaviour.setSelectedNodeIds(this.selectedNodes.map(s => s.id));

        this.nodeGroup.each(d => d.isSelected = this.selectedNodes.findIndex(s => s.id === d.id) !== -1);
        this.update();

        this.emit({
            type: NodeEvents.SelectedNodes,
            data: this.selectedNodes
        })
    }

    private bindEvents(group) {
        group.on("click", d=> {
            d3.event.stopPropagation();

            this.emit({
                type: NodeEvents.Click,
                data: d
            })
        })

        let subject = new ReplaySubject();

        subject.debounceTime(300).subscribe(d => this.emit({
            type: NodeEvents.HoverOver,
            data: d
        }))

        group.on("mouseover", d => subject.next(d));
        group.on("mouseout", d => subject.next(null));

        group.on("contextmenu", d => {
            const event = d3.event;

            event.preventDefault();

            this.emit({
                type: NodeEvents.ContextMenu,
                data: {elementData: d, event}
            })
        })

    }

    private addIconDecorator(group, condition = () => {}) {
        let {x, y, height, width} = this.getPosition(DecoratorPosition.Center);
        group.append("svg:image")
            .attr("data-id", DECORATOR_ICON_ID)
            .attr("xmls:xlink", "http://www.w3.org/1999/xlink")
            .attr("xmls:href", condition)
            .attr("x", x)
            .attr("y", y)
            .attr("height", height)
            .attr("width", width);
    }

    private addCounterDecorator(group) {
        let dimensions = this.getPosition(DecoratorPosition.NorthEast);
        let newText = group.append("text");

        newText
            .text(this.counterDecoratorText.bind(this))
            .attr("data-id", DECORATOR_COUNTER_ID)
            .attr("class", DECORATOR_COUNTER_ID)
            .attr("x", dimensions.x)
            .attr("y", dimensions.y);

        return newText;
    }

    private counterDecoratorText(d) {
        let counter = d[NEIGHBOURS_COUNT_PROPERTY];

        return counter === 0 ? "" : " + " + counter;
    }

    private getPosition(position: DecoratorPosition) {
        let dimensions = {
            x: 0,
            y: 0,
            width: CIRCLE_RADIUS,
            height: CIRCLE_RADIUS
        };

        switch (position) {
            case DecoratorPosition.Center:
                dimensions.x = -CIRCLE_RADIUS + CIRCLE_MARGIN;
                dimensions.y = -CIRCLE_RADIUS + 2;
                dimensions.width = 2 * (CIRCLE_RADIUS - CIRCLE_MARGIN);
                dimensions.height = 2 * (CIRCLE_RADIUS - CIRCLE_MARGIN);
                break;

            case DecoratorPosition.NorthEast:
                dimensions.x = -CIRCLE_RADIUS + CIRCLE_MARGIN;
                dimensions.y = -CIRCLE_MARGIN;
                break;

            case DecoratorPosition.West:
                dimensions.x = -2 * CIRCLE_RADIUS - CIRCLE_MARGIN;
                dimensions.y = -CIRCLE_RADIUS + 2;
                break;
        }

        return dimensions;
    }


    private addNodeClass(d) {
        let cssClass = "node";

        cssClass += d.isSelected ? " selectedNode" : "";

        return cssClass;
    }

    private addNodeStyleIcon() {
        // let styleIcon = "people";
        //
        // return `fill:url(#${styleIcon})`;
    }

    private ellipsisString(str) {
        return str.length > LABEL_LENGTH ? `${str.substring(0, LABEL_LENGTH-1)}...` : str;
    }
}