import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WatchListService } from '../../services/watch-list.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces';
import { ApiDataService } from '../../services/api-data.service';
import { DataShareService } from '../../services/data-share.service';



@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit {
  getUserVar = [];
  interestedUser = [];

  constructor(
    private watchListService: WatchListService,
    private db: AngularFirestore,
    public apiDataService: ApiDataService,
    public dataShareService: DataShareService,
   
  ) {
    this.dataShareService.parseUserInfo();
    
  }

  ngOnInit(): void {
    // this.dataShareService.parseUserInfo();
  this.watchListService.getUser().then(() => {
    this.yes()
  })

  // setTimeout(() =>{


  // },250)
  }


  // // use this! make a new function that runs this.
  yes() {
    console.log(this.watchListService.getUserVar)
    this.watchListService.getUserVar.forEach((user) => {
      if (user.id === this.dataShareService.currentUser.uid) {
       
        this.interestedUser.push(user.data);
        console.log(this.interestedUser, 'interested user');
      } else {
        return;
      }
    });
  }
  deleteMovie = async (title) =>{
    this.watchListService.deleteInterestedMovie(title)
    console.log('went through')
  }


  //then console.log(user)
}
