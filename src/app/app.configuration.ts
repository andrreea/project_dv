import {Injectable} from '@angular/core';

const apiBase = "/data";

@Injectable()
export class AppConfiguration {
    urls = {
        someDataForChart: `${apiBase}/flare.json`
        // barChartData: term => `/dummyData/${term}`,

    }
}