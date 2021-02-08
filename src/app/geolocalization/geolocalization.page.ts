import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geolocalization',
  templateUrl: './geolocalization.page.html',
  styleUrls: ['./geolocalization.page.scss'],
})
export class GeolocalizationPage implements OnInit {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }


  ngOnInit() {
  }

}
