import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase,AngularFireList,AngularFireObject} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  listings: any; 
  listingsKey:any[];
  
  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getListings().subscribe(listings =>{
      this.listings= listings;
      //this.listings.push('hello');
      //console.log(listings);
      this.firebaseService.getListingsKey().subscribe(listingsKey =>{
        
        this.listingsKey= listingsKey;
        //console.log(listingsKey);
      
      });

    });

   
    

    
  }

}
