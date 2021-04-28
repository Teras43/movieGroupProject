import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {WatchListService} from '../../services/watch-list.service';
import { Observable } from 'rxjs';
import {User} from '../../interfaces'
import {ApiDataService} from '../../services/api-data.service'
import {DataShareService} from '../../services/data-share.service'

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {
  getUserVar = []
  currentUser;
  interestedUser = []

  
  constructor(private watchListService : WatchListService, private db: AngularFirestore, public apiDataService: ApiDataService, public dataShareService : DataShareService) { 
    this.watchListService.getUser();
    this.getUserVar = this.watchListService.getUserVar;
    
  }
  
  ngOnInit(): void {
    // this.dataShareService.parseUserInfo();
    // this.currentUser = this.dataShareService.currentUser;
    this.wack()
    
    

  }

  wack = async () => {
    await this.dataShareService.parseUserInfo();
    setTimeout(() => {
      this.currentUser = this.dataShareService.currentUser;
      console.log(this.currentUser)
    }) 
    
  }
  // // use this! make a new function that runs this.
  
  // // await this.getUserVar.forEach(user => {
  // //   if (user.id === currentUser.uid) {
  //   interestedUser.push(user)
  // //       } else {
  // //         return

  //then console.log(user)



}
