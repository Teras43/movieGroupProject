import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {WatchListService} from '../../services/watch-list.service';
import { Observable } from 'rxjs';
import {User} from '../../interfaces'
import {ApiDataService} from '../../services/api-data.service'

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {
  getUserVar = []
  
  constructor(private watchListService : WatchListService, private db: AngularFirestore, public apiDataService: ApiDataService ) { 
    
  }
  
  ngOnInit(): void {
    this.watchListService.getUser();
    this.getUserVar = this.watchListService.getUserVar;
    

  }

  wack(){
    console.log(console.log(this.getUserVar))
  }


}
