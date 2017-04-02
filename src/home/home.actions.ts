import {Http, RequestOptions, Headers} from '@angular/http';
import {Inject, Injectable} from '@angular/core';
import {dispatcher} from "../core/dispatcher/dispatcher";
import {Observable} from "rxjs";
import {AppConfiguration} from "../app/app.configuration";

export const CH_FETCHED="CH_FETCHED";

@Injectable()
export class HomeActions{
    constructor (@Inject(Http) private http,
                private config: AppConfiguration ) {
    }

    getDataForGraph(name){
        this.get(this.config.urls.getGraphForSearchTerm(name)).subscribe( data => {
            dispatcher.emit({
                type: CH_FETCHED,
                data
            })
        })
    }

    getShortestPath(nodeSource, nodeTarget){

    }

    private get(path){
        let headers = new Headers({"Content-type": "application/json"});
        let options = new RequestOptions({headers});

        return this.makeRequest(this.http.get(path, options));

    }

    private makeRequest(request){
        return request.map(d => d.json()).do(() => dispatcher.emit({
        type:"", data: ""}));

    }

}