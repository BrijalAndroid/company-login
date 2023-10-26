import { Component} from '@angular/core';
import { UserService } from '../user.service';
import { Login } from '../data-types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService],
})
export class AddUserComponent {

  constructor(private user: UserService, private router: Router ) {}

 
  Login(data: Login):void{
      this.user.userLogin(data)      
    } 
  
 
}
