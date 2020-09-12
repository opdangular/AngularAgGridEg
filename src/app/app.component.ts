import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { NumberFormatterComponent } from './number-formatter.component';
import { NumericEditorComponent } from './numeric-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'Items';

  /* 
    All custom components should be listed in frameworkComponents configuration option.
    Pass the option to the ag-Grid in the template
  */
  frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent,
    numericEditorComponent: NumericEditorComponent
  };

  columnDefs = [
    { 
      headerName: 'Item Name', 
      field: 'itemName', 
      sortable: true, 
      filter: true, 
      editable: true,
      //checkboxSelection: true
      cellEditorSelector: function (params) {
        return {
          component: 'agRichSelectCellEditor',
          params: {
            values: [ "Coffee", "Surf", "Curtain", "Tea Bags" ]
          }
        }
      
      }
    },
    { 
      headerName: 'Category', 
      field: 'category', 
      sortable: true, 
      filter: true,  
      // Grouping table rows by Category
      rowGroup: true,
      // Hide this Column else it will be displayed twice (duplicate column)
      hide: true
    }, 
    { 
      headerName: 'Price', 
      field: 'price', 
      sortable: true, 
      filter: true,
      /* enable editing */
      editable: true,
      /* specify custom cell renderer */
      cellRenderer: 'numberFormatterComponent' ,
      /* specify custom cell editor */
      cellEditor: 'numericEditorComponent'
    },
    { 
      headerName: 'Date Purchased', 
      field: 'datePurchased', 
      sortable: true, 
      filter: true  
    }
  ];

  autoGroupColumnDef = {
    headerName: 'Group', 
    field: 'category', 
    cellRenderer: 'agGroupCellRenderer', 
    cellRendererParams: {
      checkbox: false
    }  
  };

  /*
  rowData = [
    { itemName: 'Coffee', category: 'TeaCoffee', price: 3.5, datePurchased: '09/01/2020'},
    { itemName: 'Tide', category: 'Toiletries', price: 4.5, datePurchased: '09/03/2020'},
    { itemName: 'Towel', category: 'Household', price: 4.0, datePurchased: '09/06/2020'},
    { itemName: 'Tea', category: 'TeaCoffee', price: 2.5, datePurchased: '08/01/2020'}
  ];
  */

  rowData: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.rowData = this.http.get('http://localhost:8081/items.json');
  }

  getSelectedRows() {
    // returns all rows visible on view including Group rows
    const rowInQuestion = this.agGrid.api.getModel().getRow(0); 
    const rowCount = this.agGrid.api.getModel().getRowCount();
    console.log(`Row Count: ${rowCount}`);
    console.log(`Row Model: ${rowInQuestion}`);
    console.log(rowInQuestion.data);
    //rowInQuestion.data.itemName = "Nescafe";
    

    //const nodesInQuestion = this.agGrid.api.getRenderedNodes();    
    const nodesInQuestion = this.agGrid.api.getSelectedNodes();
    this.agGrid.api.refreshRows(nodesInQuestion);
    console.log(`all nodes: ${nodesInQuestion}`);
    const dataInQuestion = nodesInQuestion.map( node => node.data );
    const selectedDataStrPresentation = dataInQuestion.map( node => node.itemName + ' ' + node.price).join(', ');
    alert(`Selected nodes: ${selectedDataStrPresentation}`);
  }

}
