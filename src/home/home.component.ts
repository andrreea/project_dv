import {Component, ViewChild, Inject} from "@angular/core";
import {HomeActions} from "./home.actions";
import {HomeStore, CH_AVAILABLE} from "./home.store";
import {Subscription} from "rxjs";
// import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";

@Component({
    selector: "home-app",
    templateUrl: "home.html"
})
export class HomeComponent {
    @ViewChild("left") leftMenuComponent: any;
    @ViewChild("right") rightMenuComponent: any;

    networkData = {nodes: [], links: []};
    chartTabActive : boolean = false;
    private subscription: Subscription;

    private selectedNodes = [];


    inputData = [
        {
            "name": "France",
            "value": 3
        },
        {
            "name": "Romania",
            "value": 2
        },
        {
            "name": "Germany",
            "value": 1
        }
    ];

    constructor(private store: HomeStore,
                private actions: HomeActions){

        this.subscription = store.subscribe(event => {

            switch (event){
                case CH_AVAILABLE:
                    this.networkData = store.getSomeData();

                    break;
            }
        });
    }

    tabChanges({index}){
        this.chartTabActive =( index === 1);
    }

    tabResultChanges() {
        window.dispatchEvent(new Event("resize"));
    }


    performSearch(searchTerm) {
        console.log(searchTerm);
        this.actions.getDataForGraph(searchTerm);
    }


    showLinkContextMenu(data){
        console.log(data);
    }

    showNodeContextMenu(data){
        console.log(data);
    }


    updateNodesSelection(selectedNodes){
        console.log(selectedNodes);
        this.selectedNodes = selectedNodes;
    }

    hoverOverNodeHandler(details) {
        console.log(details);

        // this.displayInfo(details);
    }



    lineData = [
        {
            "name": "Germany",
            "series": [
                {
                    "name": "2010",
                    "value": 7300000
                },
                {
                    "name": "2011",
                    "value": 8940000
                }
            ]
        },

        {
            "name": "USA",
            "series": [
                {
                    "name": "2010",
                    "value": 7870000
                },
                {
                    "name": "2011",
                    "value": 8270000
                }
            ]
        },

        {
            "name": "France",
            "series": [
                {
                    "name": "2010",
                    "value": 5000002
                },
                {
                    "name": "2011",
                    "value": 5800000
                }
            ]
        }
    ];

//     rawData = {nodes:[
//     {id: 11, name: "name1", counter:1, icon:"", friends: 1},
//     {id: 13, name: "name2", counter: 2, icon:"", friends: 1}]
//     , links:[
//         {srcId: 11, dstId:13 }
//     ]
// };
//
//     networkData = this.formatNetwork(this.rawData);



}