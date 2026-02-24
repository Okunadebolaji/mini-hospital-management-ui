import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-public-navbar',
  standalone : true,
  imports : [RouterModule],
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css']
})
export class PublicNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {


  }

}
