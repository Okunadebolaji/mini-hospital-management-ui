import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from '../navbar/navbar';
import { RoleNavbarComponent } from '../role-navbar/role-navbar';
@Component({
  selector: 'app-navbar-only-layout',
  standalone:true,
  imports: [CommonModule, RouterOutlet,RoleNavbarComponent],
  templateUrl: './navbar-only-layout.html',
  styleUrl: './navbar-only-layout.css'
})
export class NavbarOnlyLayout {

}
