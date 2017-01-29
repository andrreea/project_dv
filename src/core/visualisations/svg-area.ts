import * as d3 from "d3";

export class SvgArea {
    private svg: any;
    private svgGroup;
    private zoomBehaviour;

    constructor(element){
        this.zoomBehaviour = d3.zoom().scaleExtent([0.2, 8]).on("zoom", this.zoom.bind(this));

        this.svg = d3.select(element).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .call(this.zoomBehaviour);
        this.svgGroup = this.svg.append("g");

        window.addEventListener("resize", this.setSvgDimensions.bind(this))

    }

    get width() {
        return document.body.clientWidth;
    }

    get height() {
        return document.body.clientHeight;
    }

    reset() {
        this.svgGroup.remove();
    }

    getSvgGroup() {
        return this.svgGroup;
    }

    private zoom() {
        const zoomEvent = <any>d3.event;
        this.svgGroup.attr("transform", `translate(${zoomEvent.transform.x}, ${zoomEvent.transform.y})scale(${zoomEvent.transform.k})`);
    }

    private setSvgDimensions() {
        this.svg.attr("width", this.width).attr("height", this.height);
    }
}