import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'citasIps';
  public companies: MenuItem[] = [
    { url: '/home', nombre: 'Home' },
    { url: '/citas', nombre: 'Citas' }
    
  ];

  
}
