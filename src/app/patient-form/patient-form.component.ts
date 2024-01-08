import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { SharedService } from '../shared.service';
import { ServicePopupComponent } from '../service-popup/service-popup.component';


@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css'
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup;
  productDataSource: any[] = []; // Replace 'YourDataType' with the actual type of your data
  ServiceDataSource: any[] = []; // Replace 'YourDataType' with the actual type of your data


  constructor(public dialog: MatDialog, private sharedService: SharedService) { }
  ngOnInit() {
    this.patientForm = new FormGroup({
      'patientName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'address': new FormControl(null),
      'patientAge': new FormControl(null, [Validators.required, Validators.max(110)])
    });
  }

  // patientData() {
  //   this.sharedService.currentProducts.subscribe(products => {
  //     this.productDataSource = products;
  //   });
  // }


  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(ProductPopupComponent, {
      width: '1300px'
    });

    this.ServiceDataSource = [];
    // this.patientData();
    this.sharedService.updatePatientData(this.patientForm);

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Check if result has data
        this.productDataSource.push(result);
        this.productDataSource = [...this.productDataSource]; // Update the dataSource to refresh the table
        this.sharedService.updateProducts(this.productDataSource);
      }
    });
  }

  openAddServiceDialog(): void {
    const dialogRef = this.dialog.open(ServicePopupComponent, {
      width: '1300px'
    });
    this.productDataSource = [];
    // this.patientData();

    this.sharedService.updatePatientData(this.patientForm);

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Check if result has data
        this.ServiceDataSource.push(result);
        this.ServiceDataSource = [...this.ServiceDataSource]; // Update the dataSource to refresh the table
        this.sharedService.updateServices(this.ServiceDataSource);
      }
    });
  }


}
