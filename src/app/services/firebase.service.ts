import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList,AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Listing } from '../models/listing';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  listings: Observable<any[]>;
  listingsKey:any;
  listing:Observable<any>;
  folder:any;
  
  



  constructor(private db:AngularFireDatabase) {
    	this.listings = this.db.list('/listings').valueChanges() as Observable<Listing[]>;
      this.folder='listingimages';
   }
  

  getListings(){
    this.listings = this.db.list('/listings').valueChanges() as Observable<Listing[]>;
    //console.log(this.listings);
    return this.listings;
  }
  getListingsKey(){
    //console.log(this.listings);
    this.listingsKey = this.db.list('/listings').snapshotChanges() as Observable<Listing[]>;
    //console.log(this.listingsKey);
    return this.listingsKey;
  }

  

  getListingDetails(id){
    this.listing = this.db.object('/listings/'+id).valueChanges(); 
    return this.listing;
    
  }


  addListing(listing){
     //Create root ref
     
     let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        //console.log('almost');
        return this.db.list('/listings').push(listing);
      });
    }
    
    
  }

  updateListing(id, listing){
    return this.db.list('/listings').update(id, listing);
};

deleteListing(id){
  return this.db.list('/listings').remove(id);
}; 


updateImage(id, listing){
  //Create Root Ref
  let storageRef = firebase.storage().ref();

  for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let imageRef = storageRef.child(path);
      imageRef.put(selectedFile).then((snapshot) => {
          listing.image = selectedFile.name;
          listing.path = path;
          return this.db.list('/listings').update(id, listing);
      });
  }
}

}


