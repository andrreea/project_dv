import {EventEmitter, Injectable} from "@angular/core";
import * as _ from "underscore";
import {dispatcher} from "../core/dispatcher/dispatcher";
import {CH_FETCHED} from "./home.actions";

export const CH_AVAILABLE="CH_AVAILABLE";

@Injectable()
export class HomeStore extends EventEmitter<string>{

    private myDataForGraph = {nodes:[], links:[]};

    constructor(){
        super();

        dispatcher.subscribe(payload => {
            const data = payload.data;
            let graph;

            switch (payload.type){
                case CH_FETCHED:
                     graph = this.formatData(data.responseData);

                    this.myDataForGraph = {
                        nodes: [...this.myDataForGraph.nodes, ...graph.nodes],
                        links: [...this.myDataForGraph.links, ...graph.links]
                    };

                    this.emit(CH_AVAILABLE);
                    break;
            }
        });
    }

    getSomeData (){
        return this.myDataForGraph;
    }

    private formatData(rawData) {

        let nodes = [];
        rawData.forEach(dataItem => {
            if (!_.contains(_.pluck(nodes, "id"), dataItem.n1._id)) {
                dataItem.n1.id = dataItem.n1._id;
                dataItem.n1.name = dataItem.n1.properties.name;
                dataItem.n1.friends = dataItem.n1.properties.friends;
                dataItem.n1.label = dataItem.n1.labels[0];
                _.extend(dataItem.n1, dataItem.n1.properties);
                nodes.push(dataItem.n1);
            }
            if (!_.contains(_.pluck(nodes, "id"), dataItem.n2._id)) {
                dataItem.n2.id = dataItem.n2._id;
                dataItem.n2.name = dataItem.n2.properties.name;
                dataItem.n2.friends = dataItem.n2.properties.friends;
                dataItem.n2.label = dataItem.n2.labels[0];
                _.extend(dataItem.n2, dataItem.n2.properties);
                nodes.push(dataItem.n2);
            }
        });

        return {
            nodes: nodes,
            links: rawData.map(e => {
                e.id = e.r._id;
                e.srcId = e.r._fromId;
                e.dstId = e.r._toId;

                return e;
            })
        }
    }




}