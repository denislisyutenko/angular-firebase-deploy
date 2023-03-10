import {Component, OnInit} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {CustomerInterface} from '../shared/types/customer interface';

@Component({
  selector: 'crud-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  isEditPos!: number | null;
  isNotChanged!: boolean;
  private tempCustomer!: CustomerInterface;

  constructor(public httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getData();
    this.resetEditStatus();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
  }

  cancelEdit(): void {
    this.resetEditStatus();
  }

  saveCustomer(customer: CustomerInterface, i: number): void {
    const mergedCustomer = this.mergeCustomerProps(customer, this.tempCustomer);
    this.httpService.updateData(mergedCustomer, i);
    this.resetEditStatus();

    console.log(mergedCustomer);
  }

  deleteCustomer(customer: CustomerInterface): void {
    this.httpService.deleteDate(customer);
  }

  setValue(key: string, original: string, value: string): void {
    const valueTrim = value.trim();

    if (original !== valueTrim && valueTrim !== this.tempCustomer[key as keyof CustomerInterface]) {
      this.tempCustomer[key as keyof CustomerInterface] = valueTrim;
      this.isNotChanged = false;
    }
  }


  private resetCustomer = (): CustomerInterface => ({key: null, name: '', email: '', mobile: '', location: ''});

  private resetEditStatus(): void {
    this.isEditPos = null;
    this.isNotChanged = true;
    this.tempCustomer = this.resetCustomer();
  }

  private mergeCustomerProps<T extends object>(original: T, temp: T): T {
    const result: T = {...original};

    Object.keys(temp).forEach((key) => {
      if (temp[key as keyof T]) {
        result[key as keyof T] = temp[key as keyof T];
      }
    });
    return result;
  }
}
