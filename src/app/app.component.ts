import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Pronowpush';
  userEmail = null;
  handler: any = null;
  token = null;
  constructor(public UserServiceService: UserServiceService) {

  }


  ngOnInit() {
  }

  public gotopro(token, user) {
    const stripedata = {
      stripeEmail: user.email,
      stripeToken: token.id,
      name: user.username,
      amount: user.amount,
      description: user.description
    }
    console.log("Stripe Token : ", stripedata)
    this.UserServiceService.stripePayment(stripedata)
      .subscribe(data => {
        console.log(data);
        window.location.href = 'https://www.nowpush.app'
      }, err => {
        console.log(err);
      })
  }

  checkregister(email) {
    this.UserServiceService.getUserByemail(email)
      .subscribe(data => {
        if (data.data.length != 0) {
          // alert(data.isError)
          this.pay(24, data.data[0]);
          console.log("token : ", this.token);
        }
        else {
          alert(data.message);
        }
      }, err => {
        console.log("Somthing Went Wrong", err)
      });
  }

  pay(amount, user) {
    this.handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HXOYyJomblhKb80FQy9b5hGwjo3ptliKk2j6uoQNTTozjMkUwXRPIE2s4tvmfNGnr8WLvcD2otyjcgtB0c4apJI00a9L12V7g',
      locale: 'auto',
      token: (token) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.token = token;
        console.log("token : ", this.token);
        user.amount = amount * 100;
        user.description = "Now Push Pro";
        this.gotopro(token, user);
      }
    });
    this.handler.open({
      name: 'Now Push',
      description: 'Now Push Pro',
      amount: amount * 100,
      email: user.email
    });
  }

  // 4242424242424242 sucesscard number;
  // 4000002500003155 Authenticate card
  // 4000000000000002 Decline Card
}