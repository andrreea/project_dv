export interface NetworkNodeSid {
    id: string;
}

export interface NetworkNode extends NetworkNodeSid {
    nodeType?: string;
    name?: string;
}

export interface RawApiEdge {
    srcId: string;
    dstId: string;
}

export interface NetworkEdge extends RawApiEdge {
    source: string;
    target: string;
}

export interface Network {
    nodes: NetworkNode[];
    links: NetworkEdge[];
}

export interface RawAPINetwork {
    nodes: NetworkNode[];
    edges: RawApiEdge[];
}