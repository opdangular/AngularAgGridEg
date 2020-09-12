import { Component } from '@angular/core';

@Component({
    selector: 'app-number-formatter-cell',
    template: `
    <span>{{ params.value | currency: 'CAD' }}</span>
    `
})
export class NumberFormatterComponent {
    
    /*
        The job of the grid is to lay out the cells. By default, the grid will create the cell values using simple text. 
        Cell renderers are used for more complex HTML inside the cells.
    */
    params: any;

    agInit(params: any) : void {
        this.params = params;
    }
}