import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';
import { ReferenceTbl } from '../_models/referenceTbl';
import { ActivatedRoute } from '@angular/router';

@Component({
  
  templateUrl: './employeeById.component.html',
})
export class EmployeeBYIDComponent implements OnInit {
  data: any;
  id: any ;
  employee: any ;
  employees: Employee[] = [];
  BreakError={};
  references:ReferenceTbl[]= [];
  
    constructor(private employeeService: EmployeeService,private activatedRoute: ActivatedRoute ) { }
  
  
    ngOnInit(): void {

      // to get all employee records along with gender value and practice value from refrence table
      //GetByID
      this.activatedRoute.params.subscribe(data => {
        this.id = data.id
      })
      //to fetch all values of reference tbl to get gender and practice value

      this.employeeService.getAllReference()
      .subscribe(references => {this.references = references; 
      console.log(references)});

       //to fetch record of individual employee by calling get by id
      //getting the value from service by subscribing and assigning the fetched record to employee variable data= employee.
      
      this.employeeService.getById(this.id).subscribe(data => {
        this.employee= data;  
        console.log(data);
      // through get all funtion  gng to fetch practice, gender instead of  genderid, practiceid
   
      this.employeeService.getAll()
        .subscribe(employees => {this.employees = employees
                 //this for each for employee table, empl is variable

        this.employees.forEach((empl)=>
        {
          console.log(empl)
          //this for each for reference table, ref is variable

          this.references.forEach((ref)=>{    
            console.log(ref)
          //if getAll and GetById - employee id matches, will retrieve gender, practice value 

           if(empl.empDetailsID==this.employee.empDetailsID)
           {
          // if reference id and employee gender refid matched, will get value(gender) of title from reference tbl.

            if(ref.referenceId==empl.genderRefId)
              {
                this.employee.gender=ref.title;
                console.log(ref.title)
                console.log(this.employee.gender)               
              }
          // if reference id and employee practice refid matched, will get value(practice) of title from reference tbl.

              else if(ref.referenceId==empl.practiceRefId)
              {
                this.employee.practice=ref.title
                console.log(ref.title)

                console.log(this.employee.practice)
                

              }
            }
      })
    });
  });
});
    }
          
  }
