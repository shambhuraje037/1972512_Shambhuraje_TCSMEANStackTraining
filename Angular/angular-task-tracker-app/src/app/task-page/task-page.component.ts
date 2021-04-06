import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {Task} from '../tasks.model';
 
@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  displayDetails: string[] = ['id', 'name', 'task', 'deadline'];
  task:Array<Task>=[];
  constructor(public empSer: EmployeeService) { }
  
  ngOnInit(): void {
    this.empSer.loadTaskDetails().subscribe(res => this.task=res)
  }
  storeEmp(empRef:any){
    console.log(empRef);
    this.empSer.storeEmployee(empRef);
  }
}
