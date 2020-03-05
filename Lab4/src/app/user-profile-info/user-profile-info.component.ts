import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.css']
})
export class UserProfileInfoComponent implements OnInit {
  userData;

  constructor(
    private profileService: ProfileService) {
  }

  ngOnInit() {
    this.userData = this.profileService.getUserData();
    console.log(this.userData);
  }

}
