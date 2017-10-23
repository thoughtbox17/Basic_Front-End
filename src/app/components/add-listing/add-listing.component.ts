import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages'


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title:any;
  owner:any;
  city:any;
  bedrooms:any;
  price:any;
  type:any;
  image:any;

  constructor(private firebaseService:FirebaseService,
    private router:Router , private flm:FlashMessagesService) { }

  ngOnInit() {
    
  }
  
  onAddSubmit(){
    var check=false;
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms:this.bedrooms,
      price: this.price,
      type: this.type
    }

    if(listing.title == undefined || listing.city == undefined || listing.owner == undefined || listing.bedrooms == undefined || listing.type == undefined || listing.price == undefined){
      check =false;
    } else {
      check= true;
    }
    this.flm.show('Please fill in all fields',{cssClass: 'alert-danger',timeout:3000});
    if(check){
      //console.log('check work')
      this.firebaseService.addListing(listing);
      this.router.navigate(['listings']);
    }
    
  }


 
  



}
