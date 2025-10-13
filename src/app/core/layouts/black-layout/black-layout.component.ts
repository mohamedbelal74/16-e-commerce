import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-black-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './black-layout.component.html',
  styleUrl: './black-layout.component.css'
})
export class BlackLayoutComponent {

}
