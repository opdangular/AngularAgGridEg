import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { NumberFormatterComponent } from './number-formatter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'Items';

  frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent
  };

  columnDefs = [
    { headerName: 'Item Name', field: 'itemName', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Category', field: 'category', sortable: true, filter: true  },
    { headerName: 'Price', field: 'price', sortable: true, filter: true  },
    { headerName: 'Date Purchased', field: 'datePurchased', sortable: true, filter: true  }
  ];

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
    const rowInQuestion = this.agGrid.api.getModel().getRow(0);
    console.log(`Row Model: ${rowInQuestion}`);
    console.log(rowInQuestion.data);
    rowInQuestion.data.itemName = "Nescafe";
    

    const nodesInQuestion = this.agGrid.api.getRenderedNodes();
    this.agGrid.api.refreshRows(nodesInQuestion);
    //const nodesInQuestion = this.agGrid.api.getSelectedNodes();
    console.log(`all nodes: ${nodesInQuestion}`);
    const dataInQuestion = nodesInQuestion.map( node => node.data );
    const selectedDataStrPresentation = dataInQuestion.map( node => node.itemName + ' ' + node.category).join(', ');
    alert(`Selected nodes: ${selectedDataStrPresentation}`);
  }

}
