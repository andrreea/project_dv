import {SvgArea} from "./svg-area";
import {ForceSimulation} from "./force-simulation";

let forceSimulationFactory = (svgArea: SvgArea) => {
    return new ForceSimulation(svgArea.width, svgArea.height);
}

export let forceSimulationProvider = {
    provide: ForceSimulation,
    useFactory: forceSimulationFactory,
    deps: [SvgArea]
};