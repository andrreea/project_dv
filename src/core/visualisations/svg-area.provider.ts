import {ElementRef} from "@angular/core";
import {SvgArea} from "./svg-area";

let svgAreaFactory = (element: ElementRef) => {
    return new SvgArea(element.nativeElement);
};

export let svgAreaProvider = {
    provide: SvgArea,
    useFactory: svgAreaFactory,
    deps: [ElementRef]
};