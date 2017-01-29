import {SvgArea} from "./svg-area";
import {ForceSimulation} from "./force-simulation";
import {NodeGenerator} from "./node-generator";

let nodeGeneratorFactory = (svgArea: SvgArea, simulation: ForceSimulation) => {
    return new NodeGenerator(svgArea.getSvgGroup(), simulation);
}

export let nodeGeneratorProvider = {
    provide: NodeGenerator,
    useFactory: nodeGeneratorFactory,
    deps: [SvgArea, ForceSimulation]
};