import {EventEmitter} from "@angular/core";

export interface DispatcherPayload {
    type: string | number;
    data: any;
}

//enforce the payload type on emit
class Dispatcher {
    private emitter;

    constructor() {
        this.emitter = new EventEmitter();
    }

    emit(value: DispatcherPayload): void {
        this.emitter.emit(value);
    }

    subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
        this.emitter.subscribe(generatorOrNext, error, complete);
    }
}

export const dispatcher = new Dispatcher();