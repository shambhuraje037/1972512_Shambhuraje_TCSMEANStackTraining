import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  flag:boolean = false;
  msg:string="";
  toggle:string = "Start";
  title = 'online-test-app';
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

  change(){
    this.flag = !this.flag;

    if (this.flag) {
    this.toggle = "Quit";
  }

    else {this.toggle = "Start";
  }
  }
}
