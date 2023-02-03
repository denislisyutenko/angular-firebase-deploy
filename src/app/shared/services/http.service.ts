import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomerInterface} from '../types/customer interface';
import {ResponseCustomerInterface} from '../types/responseCustomer.interface';
import {RequestCustomerInterface} from '../types/requestCustomer.interface';

const url = 'https://angular----27012023-default-rtdb.europe-west1.firebasedatabase.app/customers';
const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  customers: CustomerInterface[] = [];

  constructor(private http: HttpClient) {
  }

  //crud
  //Create => Post

  createData(customer: CustomerInterface): void {
    this.http.post<RequestCustomerInterface>(`${url}.json`, customer, httpOptions)
      .subscribe({
        next: (res) => {
          this.customers.push({...{key: res.name}, ...customer});
        },
        error: (err) => console.log(err)
      });
  }

  //Read => Get
  getData(): void {
    this.http.get<ResponseCustomerInterface>(`${url}.json`, httpOptions)
      .subscribe({
        next: (res) => {
          Object.keys(res).forEach(key => {
            this.customers.push({key, ...res[key]});
          });
        },
        error: (err) => console.log(err)
      });
  }

  //Update => PUT, PATH
  updateData(): void {
  }

  //Delete => Delete
  deleteDate(): void {
  }
}
