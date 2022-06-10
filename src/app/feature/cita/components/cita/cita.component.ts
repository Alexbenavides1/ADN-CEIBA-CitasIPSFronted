import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  tituloApp : string;

  constructor() { 
    this.tituloApp='Citas IPS';
  }

  ngOnInit(): void {}

}
