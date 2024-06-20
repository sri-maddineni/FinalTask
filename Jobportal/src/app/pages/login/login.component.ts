import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserResponse } from '../../Interfaces/ResponsesInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public username=""
  public email=""
  public password=""


  userForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';


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

  async  onsubmit(){
    const details={
      email:this.email,
      password:this.password
    }

    if (this.userForm.valid) {
      console.log(details)
      await this.userService.LoginUser(details).subscribe(
        (response:UserResponse) => {
          this.successMessage = 'User LoggedIn successfully!';
          this.errorMessage = '';
          this.userForm.reset();
          this.toast.success(this.successMessage);

          
        
          this.email=""
          this.password=""

          console.log(response)
          
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

}
