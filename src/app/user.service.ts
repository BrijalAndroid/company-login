import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, LoginResponse } from '../app/data-types';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUserLogin = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userLogin(data: Login) {

    alert("Starting post");
    alert(data.UserName);
    this.http.post<LoginResponse>('http://bhavya0211:8085/api/users', data, { observe: 'response' })
      .subscribe(
        (result) => {
          if (result.body) {
            alert('Successfully Login!!');
            // Extract user ID and token from the response
            const userId = result.body.data.user.id;
            const token = result.body.data.token;
            
            // Store user ID and token in local storage
            localStorage.setItem('userId', userId.toString());
            localStorage.setItem('token', token);
            
            // Update the authentication status
            this.isUserLogin.next(true);
            
            // Navigate to the user home
            this.router.navigate(['user-home']);
          } else {
            console.error('Login response body is null');
            alert('Login 1 Failed');
          }
        },
        (error) => {
          console.error('Login API error:', error.error.message);
          // Log the error Object
          console.log(JSON.stringify(error))
          alert('Login 2 Failed');
        }
      );
  }
  

  reloadUser() {
    if (localStorage.getItem('user')) {
      this.isUserLogin.next(true);
      this.router.navigate(['user-home']);
    }
  }

   // Method to handle user logout via API
   logoutApi(): void {
    const token = localStorage.getItem('token');
    console.log(token);
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (!token || !userId) {
      console.error('Token or UserId not found');
      return;
    }
  
    const headers = new HttpHeaders({
      'token': token,
      'UserID': userId
    });
  
    const options = { headers };

    console.log(options);
  
    this.http.post('http://bhavya0211:8085/api/users/logout', {}, options).subscribe(
      () => {
        // Clear user authentication and navigate to 'add' route on successful logout
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.isUserLogin.next(false);
        this.router.navigate(['add']);
        alert('Successfully API Logout!!');
      },
      (error) => {
        console.error('Logout API error:', error);
        alert('Logout API Failed');
      }
    );
  }

  logout() {
    this.logoutApi();
  }
  
}

   



   // console.log('Before removing user from local storage:', localStorage.getItem('user'));
    // localStorage.removeItem('user');
    // console.log('After removing user from local storage:', localStorage.getItem('user'));
    // this.isUserLogin.next(false);
    // this.router.navigate(['add']);
  

 


