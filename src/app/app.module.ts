import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import {FirebaseService} from './services/firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import {FlashMessagesModule} from 'angular2-flash-messages';



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { environment } from '../environments/environment';



const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'listings', component:ListingsComponent},
  {path:'listing/:id', component:ListingComponent},
  {path: 'add-listing', component:AddListingComponent},
  {path:"edit-listing", component: EditListingComponent},
  {path:'edit-listing/:id', component:EditListingComponent}

];

export const firebaseConfig = {
  apiKey: "AIzaSyAdouFVjJ0xzuJEYoTZia2EKG9_9Eb_x48",
  authDomain: "testproject2-4cf86.firebaseapp.com",
  databaseURL: "https://testproject2-4cf86.firebaseio.com",
  projectId: "testproject2-4cf86",
  storageBucket: "testproject2-4cf86.appspot.com",
  messagingSenderId: "702249370188"
};



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase,),
    FlashMessagesModule,
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    FirebaseService,
    AngularFireDatabase, 
    AngularFireDatabaseModule,
    AngularFireAuth
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
