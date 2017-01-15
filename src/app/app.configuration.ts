const apiBase = "/api";

export class AppConfiguration {
    urls = {
        barData: `{$apiBase}/somedata`,
        barChartData: term => `/dummyData/${term}`
    }
}