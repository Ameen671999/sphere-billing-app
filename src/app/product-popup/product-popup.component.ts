import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css']
})
export class ProductPopupComponent implements OnInit {

  productForm: FormGroup;

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl(''),
      productType: new FormControl(''),
      productPrice: new FormControl(0),
      quantity: new FormControl(1),
      amount: new FormControl()
    });

    this.productForm.get('productPrice').valueChanges
      .subscribe(value => this.updateAmount());
    this.productForm.get('quantity').valueChanges
      .subscribe(value => this.updateAmount());
  }

  private updateAmount() {
    const price = this.productForm.get('productPrice').value;
    const quantity = this.productForm.get('quantity').value;
    this.productForm.get('amount').setValue(price * quantity);
  }

  // submitProduct() {
  //   const productData = this.productForm.value;
  //   productData.id = new Date().getTime(); // Using timestamp as a unique ID
  //   // Send productData back to the parent component
  // }
}
