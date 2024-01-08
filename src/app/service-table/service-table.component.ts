import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrl: './service-table.component.css'
})
export class ServiceTableComponent implements OnInit {

  dataSource: any[] = []// Data source passed from the parent component
  showServiceTable: boolean = false;
  displayedColumns: string[] = ['serviceType', 'costPerSession', 'noOfSession', 'amount', 'actions'];
  // tableDataSource: MatTableDataSource<any>;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.currentServices.subscribe(services => {
      this.dataSource = services;
    });

    this.sharedService.currentServicesShowTable.subscribe(show => {
      this.showServiceTable = show;
    });


  }

  // Method to calculate the total amount
  getTotalAmount() {
    return this.dataSource.reduce((acc, curr) => acc + curr.amount, 0);
  }

  // Method to delete a service
  deleteService(service: any) {
    const serviceIndex = this.dataSource.findIndex(p => p.id === service.id);
    if (serviceIndex > -1) {
      this.dataSource.splice(serviceIndex, 1);
      // If you're using MatTableDataSource, update the data source like this:
      this.dataSource = [...this.dataSource];
      this.sharedService.updateServices(this.dataSource)
    }
  }

}