import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { SidebarComponent } from '../sidebar/sidebar';
import { PublicNavbarComponent } from '../public-navbar/public-navbar.component';
// import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, PublicNavbarComponent],
  templateUrl: './public-layout.html',
  styleUrls: ['./public-layout.css']
})
export class PublicLayoutComponent {}
