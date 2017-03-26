import {SvgArea} from "./svg-area";
import {LinkGenerator} from "./link-generator";

let linkGeneratorFactory = (svgArea: SvgArea) => {
    return new LinkGenerator(svgArea.getSvgGroup());
}

export let linkGeneratorProvider = {
    provide: LinkGenerator,
    useFactory: linkGeneratorFactory,
    deps: [SvgArea]
};