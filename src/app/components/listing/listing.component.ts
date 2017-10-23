import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Listing } from '../../models/listing';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id:any;
  listing: Listing;
  imageUrl:string;
  listingsKey:any[];
  secondLevelLocation:string;

  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessageService: FlashMessagesService
  ) { }

  ngOnInit() {
     //Get ID
    this.id = this.route.snapshot.params['id'];
    
        this.firebaseService.getListingDetails(this.id).subscribe(listing => {
          this.listing = listing;
          //console.log(this.listing);

          this.firebaseService.getListingsKey().subscribe(listingsKey =>{
            
            this.listingsKey= listingsKey;
            
            var pathArray = window.location.pathname.split( '/' );
             this.secondLevelLocation = pathArray[2];
            console.log(this.secondLevelLocation);
          
          });
    
          let storageRef = firebase.storage().ref();
          let spaceRef = storageRef.child(this.listing.path);
          storageRef.child(this.listing.path).getDownloadURL().then((url) => {
            // Set image url
            this.imageUrl = url;
          }).catch((error) => {
            console.log(error);
          });
        });  

  }

  onDelete(){
    this.firebaseService.deleteListing(this.id);
    this.flashMessageService.show("Listing deleted", {cssClass: "alert-danger", timeout: 3000});
    this.router.navigate(['/listings']);
  }

  

}