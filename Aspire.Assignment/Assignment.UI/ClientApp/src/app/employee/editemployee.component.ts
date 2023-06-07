import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, pipe } from 'rxjs';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';
import { AddEmployee } from '../_models/addEmployee';
import { ReferenceTbl } from '../_models/referenceTbl';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';


@Component({ templateUrl: 'editemployee.component.html' })

export class EditemployeeComponent  implements OnInit {
  
  EmployeeForm!: FormGroup;
  data: any;

  id: any ;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  employee: any ;
  employees: Employee[] = [];
  references:ReferenceTbl[]= [];
  addemployeeobj: AddEmployee = new AddEmployee();
  genderdata!: any;
  practicedata!: any;

  


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private employeeService: EmployeeService,
      private alertService: AlertService,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() : void {
    
      this.EmployeeForm = this.formBuilder.group({
        employeeDetailId:[''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dob: ['', Validators.required],
        genderRefId: ['', Validators.required],
        contactNumber: ['', Validators.required],
        alternateNumber: ['', Validators.required],
        email:[],
        address:[],
        city:[],
        state:[],
        country:[],
        zip:[],
        employeeNumber:[],
        empDesignation:[],
        practiceRefId:['', Validators.required],
        doj:[],
        empType:[],
      });

      this.title = 'Edit Employee';

 //     
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
//called getreference method, to list value in drop down of edit form
    this.getReference();
  }
    // convenience getter for easy access to form fields
    get f() { return this.EmployeeForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.EmployeeForm.invalid) {
            return;
        }

        this.submitting = true;
        //to map the form value(i.e user fills value in input field) to employee model object
        this.addemployeeobj.employeeDetailId = this.employee.empDetailsID;
       
        this.addemployeeobj.firstName = this.EmployeeForm.value.firstName;
        this.addemployeeobj.lastName = this.EmployeeForm.value.lastName;
        this.addemployeeobj.dob = this.EmployeeForm.value.dob;
        this.addemployeeobj.genderRefId = Number(this.EmployeeForm.value.genderRefId);
        this.addemployeeobj.contactNumber = this.EmployeeForm.value.contactNumber;
        this.addemployeeobj.alternateNumber = this.EmployeeForm.value.alternateNumber;
        this.addemployeeobj.email = this.EmployeeForm.value.email;
        this.addemployeeobj.address = this.EmployeeForm.value.address;
        this.addemployeeobj.city = this.EmployeeForm.value.city;
        this.addemployeeobj.state = this.EmployeeForm.value.state;
        this.addemployeeobj.country = this.EmployeeForm.value.country;
        this.addemployeeobj.zip = this.EmployeeForm.value.zip;
        this.addemployeeobj.employeeNumber = this.EmployeeForm.value.employeeNumber;
        this.addemployeeobj.empDesignation = this.EmployeeForm.value.empDesignation;
        this.addemployeeobj.practiceRefId = Number(this.EmployeeForm.value.practiceRefId);
        this.addemployeeobj.doj = this.EmployeeForm.value.doj;
        this.addemployeeobj.empType = this.EmployeeForm.value.empType;
        console.log(this.addemployeeobj)
       // to call put service and passed only object
        this.employeeService.put(this.addemployeeobj)
            .subscribe({
                next: () => {
                    this.alertService.success('Employee detail updated', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/empl');
                    // console.log(this.EmployeeForm)

                },
                error: (error: any) => {
                    this.alertService.error(error);
                    this.submitting = false;
                }


            })
    }
//to get all value from reference for edit form drop down
getReference()
 {
  this.employeeService.getAllReference().subscribe((data: any[]) => {
    this.genderdata = data;
    this.practicedata= data;

    console.log(this.genderdata)
  });
 }

}
