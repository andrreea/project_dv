import {Injectable} from '@angular/core';

const apiBase = "/json";
const apiGraph = "/graph";

@Injectable()
export class AppConfiguration {
    urls = {
        someDataForChart: `${apiBase}/id1/id2`,
        getGraphForSearchTerm: searchTerm => `${apiGraph}/getGraphByName/${searchTerm}`,
        // someDataForChart: `${apiBase}/flare.json`
        // barChartData: term => `/dummyData/${term}`,

    }
}