import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomerInterface} from '../types/customer interface';
import {ResponseCustomerInterface} from '../types/responseCustomer.interface';
import {RequestCustomerInterface} from '../types/requestCustomer.interface';
import {catchError, Observable, of} from 'rxjs';
import {environment} from '../../../../environments/environment';

// const url = 'https://angular----27012023-default-rtdb.europe-west1.firebasedatabase.app/customers';

const url = `${environment.url}/customers`;
const httpOptions = {headers: new HttpHeaders({'Content-type': 'application/json'})};

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
        error: catchError(this.errorHandler<RequestCustomerInterface>('GET'))
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
        error: catchError(this.errorHandler<ResponseCustomerInterface>('POST'))
      });
  }

  //Update => PUT, PATH
  updateData(customer: CustomerInterface, i: number): void {
    const {key, ...data} = customer;
    this.http.put<CustomerInterface>(`${url}/${key}.json`, data, httpOptions)
      .subscribe({
        next: (res) => this.customers[i] = customer,
        error: catchError(this.errorHandler<CustomerInterface>('PUT'))
      });
  }

  //Delete => Delete
  deleteDate(customer: CustomerInterface): void {
    this.http.delete(`${url}/${customer.key}.json`)
      .subscribe({
        next: () => this.customers.splice(this.customers.indexOf(customer), 1),
        error: catchError(this.errorHandler('DELETE'))
      });
  }

  private errorHandler<T>(operation: string, res?: T): any {
    return (err: any): Observable<T> => {
      console.error(`${operation} failed: ${err}`);
      return of(res as T);
    };
  }


}
