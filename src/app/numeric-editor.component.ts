import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ICellEditorAngularComp, ICellRendererAngularComp } from 'ag-grid-angular'
import { isNumber } from 'util';

@Component({
    selector: 'app-numeric-editor-cell',
    template: `
        <input #i [value]='params.value' (keypress)="onKeyPress($event)" (keydown)="onKeyDown($event) "/>
    `
})
export class NumericEditorComponent implements AfterViewInit {
    /* 
        We need to access the input and read its value in order to return the value that a user typed into the input. 
        In Angular we can use the @ViewChild
    */
    @ViewChild('i') textInput;
    params;

    /* 
        To set focus to the input in our custom cell editor as soon as the user activates the edit mode
    */
    ngAfterViewInit() {
        setTimeout(() => {
            this.textInput.nativeElement.focus();
        });
    }

    /*
        This component will receive the value of a cell through the agInit method
    */
    agInit(params: any): void {
        console.log('setting cell value in editor..');
        this.params = params;
    }

    /*
        A cell editor should implement the getValue method that ag-Grid uses to request the value from our component and update the data
    */
    getValue() {
        console.log('returning cell value from editor to cell')
        return this.textInput.nativeElement.value;
    }

    // https://keycode.info
    onKeyPress(event) {
        if(!isNumeric(event)) {
            event.preventDefault();
        }

        function isNumeric(ev) {
            let regExp = /^\d*[.]?\d*$/;
            return regExp.test(ev.key);
        }
    }

    /*
        Unlike the keypress event, the keydown event is fired for all keys, regardless of whether they produce a character value. 
        The keydown and keyup events provide a code indicating which key is pressed, while keypress indicates which character was entered.
    */
    onKeyDown(event) {
        if(event.keyCode === 39 || event.keyCode === 37) {
            event.stopPropagation();
        }
    }
}