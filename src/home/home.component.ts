import {Component, ViewChild, Inject} from "@angular/core";
import {HomeActions} from "./home.actions";
import {HomeStore, CH_AVAILABLE} from "./home.store";
import {Subscription} from "rxjs";
// import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";

export enum CONTEXT_MENU_OPTIONS {
    SHORTEST_PATH,
    VIEW_DETAILS
}

@Component({
    selector: "home-app",
    templateUrl: "home.html"
})
export class HomeComponent {
    @ViewChild("left") leftMenuComponent: any;
    @ViewChild("right") rightMenuComponent: any;

    networkData = {nodes: [], links: []};
    chartTabActive : boolean = false;

    hideNodeContextMenu = true;
    currentContextMenuNodeSelected;
    nodeContextMenuPosition;
    nodeContextMenuPositionX = -100;
    nodeContextMenuPositionY = -100;
    nodeContextMenuOptions = [
        { id: CONTEXT_MENU_OPTIONS.SHORTEST_PATH,  label: "Shortest Path"}
    ];

    showFooter = false;
    graphFooterTitle = "";
    // graphFooterDetails = null;
    graphFooterDetails = [{label: "Name", value: "123"}];

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
        this.hideNodeContextMenu = false;
        this.currentContextMenuNodeSelected = data.data;
        this.nodeContextMenuPositionX = data.position.x;
        this.nodeContextMenuPositionY = data.position.y;
    }

    nodeSelectionOperation(operation: CONTEXT_MENU_OPTIONS) {
            switch (operation){
                case CONTEXT_MENU_OPTIONS.SHORTEST_PATH:
                    this.actions.getShortestPath(this.selectedNodes[0], this.selectedNodes[1]);
                    this.hideNodeContextMenu = true;

                    break;

            }
    }

    updateNodesSelection(selectedNodes){
        this.selectedNodes = selectedNodes;
    }

    hoverOverNodeHandler(details) {
        this.showFooter = true;
        this.displayInfo(details);
    }

    private displayInfo (details) {
        let nodeDetails = details;
        if (nodeDetails) {
            this.graphFooterTitle = nodeDetails.label;
            this.graphFooterDetails = this.getNodeDetails(nodeDetails);
        }
        // if (this.selectedNodes.length ===1 && details=== null){
        //     nodeDetails = this.selectedNodes[0];
        // }
        //
        // if (nodeDetails === null) {
        //     this.graphFooterTitle = "";
        //     this.graphFooterDetails = null;
        // } else {
        //     this.graphFooterTitle = nodeDetails.label;
        //     this.graphFooterDetails = this.getNodeDetails(nodeDetails);
        // }
    }

    private getNodeDetails (node) {
        return [
            {label: "Name", value: node.name}
        ]
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

    // width: 250px;
    // background: white;
    // /* height: 300px; */
    // /* x: 10px; */
    // /* y: 10px; */
    // top: 20px;
    // position: fixed;
    // left: 285px;
    // padding: 0px;
    // height: 30px;



}