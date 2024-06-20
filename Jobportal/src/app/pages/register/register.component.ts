import { Component } from '@angular/core';
import { NavbarComponent } from '../../reusable/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserResponse } from '../../Interfaces/ResponsesInterface';
import { HomedataService } from '../../Services/homedata.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


    //user variables
    public fname:string=""
    public email:string=""
    public uname:string=""
    public password:string=""
    public cpassword:string=""

    public id:string=""
  
    public title:String=""
    public des:String=""
  
  
  

  // public fname="";
  // public email=""
  // public uname=""
  // public password=""
  // public cpassword=""
  // public id=""


  userForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';


  // public details={
  //   name:this.fname,
  //   username:this.uname,
  //   email:this.email,
  //   password:this.password
  // }

  constructor(private toast: ToastrService,private fb: FormBuilder, private userService: UserService) {


    


    this.userForm = this.fb.group({
      id:[''],
      name: ['' ],
      username:[''],
      email: [''],
      password: ['' ]
    });
  }

  ngOnInit(): void {}

  async onsubmit() {

    
  const details={
    id:this.id,
    name:this.fname,
    email:this.email,
    username:this.uname,
    password:this.password
  }


    if (this.userForm.valid) {
      console.log(details)
      await this.userService.createUser(details).subscribe(
        (response:UserResponse) => {
          this.successMessage = 'User created successfully!';
          this.errorMessage = '';
          this.userForm.reset();
          this.toast.success(this.successMessage);
          this.cpassword=""
          this.fname=""
          this.email=""
          this.uname=""
          this.password=""
          
        },
        (error:HttpErrorResponse) => {
          this.errorMessage = error.message;
          this.successMessage = '';
          console.log(error)
          this.toast.error(this.errorMessage,"Error occured")
        }
      );
    }
    else{
      this.logValidationErrors();
      console.log("Invalid form")
    }

  }


private logValidationErrors() {
  Object.keys(this.userForm.controls).forEach(key => {
    const controlErrors = this.userForm.get(key)?.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(errorKey => {
        console.log(`Key: ${key}, Error: ${errorKey}, Value: ${controlErrors[errorKey]}`);
      });
    }
  });
}

  public oncompanysubmit(){

  }



}
