import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees:Employee[] | undefined;
  public editEmployee!: Employee;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
    
  }

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[])=>{
        this.employees=response;
      }
    ),
    (error : HttpErrorResponse)=>{
      console.log(error.message);
    }
  }

public onAddEmployee(addFrom: NgForm):void{
  document.getElementById('add-employyee-form')?.click();

  this.employeeService.addEmployee(addFrom.value).subscribe(
    (response: Employee)=>{
      console.log(response);
      this.getEmployees();

    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
    
    );

}
public onEditEmployee(employee:Employee):void{
  document.getElementById('edit-employyee-form')?.click();
  
  this.employeeService.addEmployee(employee).subscribe(
    (response: Employee)=>{
      console.log(response);
      this.getEmployees();

    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
    
    );


}

public openModalEmployee(employee: Employee| null, mode:String):void{
  const container=document.getElementById('containerId')
  const button=document.createElement('button');
  button.type="button";
  button.style.display="none";
  button.setAttribute('data-toggle',"modal");

  if(mode==="add"){
    button.setAttribute('data-target',"#addEmployeeModal");
  }
  if(mode==="edit"){
    if(employee!=null)
    this.editEmployee=employee;

    button.setAttribute('data-target',"#editEmployeeModal");
  }
  if(mode ==="delete"){
    button.setAttribute('data-target',"#deleteEmployeeModal");
  }
  container?.appendChild(button);
  button.click();
}

}

