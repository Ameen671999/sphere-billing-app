import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  dataSource: any[] = []// Data source passed from the parent component
  showProductsTable: boolean = false;
  displayedColumns: string[] = ['productName', 'productType', 'productPrice', 'quantity', 'amount', 'actions'];
  // tableDataSource: MatTableDataSource<any>;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.currentProducts.subscribe(products => {
      this.dataSource = products;
    });

    this.sharedService.currentProductsShowTable.subscribe(show => {
      this.showProductsTable = show;
    });
  }

  // Method to calculate the total amount
  getTotalAmount() {
    return this.dataSource.reduce((acc, curr) => acc + curr.amount, 0);
  }

  // Method to delete a product
  deleteProduct(product: any) {
    const productIndex = this.dataSource.findIndex(p => p.id === product.id);
    if (productIndex > -1) {
      this.dataSource.splice(productIndex, 1);
      // If you're using MatTableDataSource, update the data source like this:
      this.dataSource = [...this.dataSource];
      this.sharedService.updateProducts(this.dataSource)
    }
  }

}