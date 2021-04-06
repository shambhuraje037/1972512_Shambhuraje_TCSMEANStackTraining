import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Task } from './tasks.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient) { }
  storeEmployee(emp:any){
    this.http.post("http://localhost:3000/employees",emp).subscribe(result=>console.log(result), error=>console.log(error));
  }

  loadTaskDetails():Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:3000/employees");
  }
}
