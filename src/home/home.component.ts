import {Component, ViewChild, Inject} from "@angular/core";
// import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";

@Component({
    selector: "home-app",
    templateUrl: "home.html"
})
export class HomeComponent {
    @ViewChild("left") leftMenuComponent: any;
    @ViewChild("right") rightMenuComponent: any;

    inputData = [
        {
            "name": "Germany",
            "value": 8940000
        },
        {
            "name": "USA",
            "value": 5000000
        },
        {
            "name": "France",
            "value": 7200000
        }
    ];

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

    rawData = {nodes:[
        {id: 1, name: "name1", counter:1, icon:"", friends: 1},
        {id: 2, name: "name2", counter: 2, icon:"", friends: 1}]
        ,
        links:[
            {srcId: 1, dstId:2 }
        ]};

    networkData = this.formatNetwork(this.rawData);



    // constructor(@Inject(MdDialog) private dialog,
    //             @Inject(MdDialogConfig) private dialogConfig){
    //
    // }

    showLinkContextMenu(data){
        console.log(data);
    }

    showNodeContextMenu(data){
        console.log(data);
    }

    private formatNetwork(rawData) {
        return {
            nodes: rawData.nodes,
            links: rawData.links.map(e => {
                e.source = e.srcId;
                e.target = e.dstId;

                return e;
            })
        }
    }



}