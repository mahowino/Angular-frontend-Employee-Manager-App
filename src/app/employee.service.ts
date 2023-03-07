import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Employee } from "./employee";
import { environment } from "src/environments/environments.sandbox";

@Injectable({
    providedIn:'root'
})

export class EmployeeService{

    private apiServerUrl=environment.apiBaseUrl;
    

    constructor(private http: HttpClient){

    }

    public getEmployees():Observable<Employee[]>{
        return this.http.get<any>(`${this.apiServerUrl}/employee/all`);
    }

    public addEmployee(employee: Employee):Observable<Employee>{
        return this.http.post<any>(`${this.apiServerUrl}/employee/add`,employee);
    }

    public updateEmployee(employee: Employee):Observable<Employee>{
        return this.http.put<any>(`${this.apiServerUrl}/employee/update`,employee);
    }
    public deleteEmployee(employeeId: number):Observable<void>{
        return this.http.delete<any>(`${this.apiServerUrl}/employee/delete/${employeeId}`,);
    }


}
