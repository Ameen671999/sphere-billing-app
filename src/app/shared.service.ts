import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private patientData = new BehaviorSubject<any>(null);
  currentPatientData = this.patientData.asObservable();

  private productsDataSource = new BehaviorSubject<any[]>([]);
  currentProducts = this.productsDataSource.asObservable();

  private servicesDataSource = new BehaviorSubject<any[]>([]);
  currentServices = this.servicesDataSource.asObservable(); // Fixed this line

  private showProductTableSource = new BehaviorSubject<boolean>(false);
  currentProductsShowTable = this.showProductTableSource.asObservable();

  private showServiceTableSource = new BehaviorSubject<boolean>(false);
  currentServicesShowTable = this.showServiceTableSource.asObservable();

  constructor() { }

  updatePatientData(data: any) {
    this.patientData.next(data);
  }

  updateProducts(products: any[]) {
    this.productsDataSource.next([...products]);
    this.showProductTableSource.next(true);
    this.showServiceTableSource.next(false);

  }

  updateServices(services: any[]) {
    this.servicesDataSource.next([...services]);
    this.showServiceTableSource.next(true);
    this.showProductTableSource.next(false);

  }
}
