import {Component, OnInit} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {CustomerInterface} from '../shared/types/customer interface';

@Component({
  selector: 'crud-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  isEditPos: number | null = null;
  isChanged = false;
  private tempCustomer!: CustomerInterface;

  constructor(public httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getData();
    this.tempCustomer = this.resetCustomer();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
  }

  cancelEdit(): void {
    this.isEditPos = null;
  }

  saveCustomer(): void {
  }

  deleteCustomer(): void {
  }

  setValue(key: string, original: string, value: string): void {
    console.log(key, original, value);
  }


  private resetCustomer = (): CustomerInterface => ({
    key: null,
    name: '',
    email: '',
    mobile: '',
    location: ''
  });
}
