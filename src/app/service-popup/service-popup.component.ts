import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-popup',
  templateUrl: './service-popup.component.html',
  styleUrl: './service-popup.component.css'
})
export class ServicePopupComponent {
  serviceForm: FormGroup;

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      serviceType: new FormControl(''),
      costPerSession: new FormControl(0),
      noOfSession: new FormControl(1),
      amount: new FormControl()
    });

    this.serviceForm.get('costPerSession').valueChanges
      .subscribe(value => this.updateAmount());
    this.serviceForm.get('noOfSession').valueChanges
      .subscribe(value => this.updateAmount());
  }

  private updateAmount() {
    const costPerSession = this.serviceForm.get('costPerSession').value;
    const noOfSession = this.serviceForm.get('noOfSession').value;
    this.serviceForm.get('amount').setValue(costPerSession * noOfSession);
  }

}
