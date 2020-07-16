import { Component } from '@angular/core';

import { CalculateService } from '../services/calculate.service';


@Component({
  selector: 'app-geolocalization',
  templateUrl: 'geolocalization.page.html',
  styleUrls: ['geolocalization.page.scss'],
})
export class GeolocalizationPage {

  location_distance: any ;
  destination_address: any ;
  origin_address: any ;
  travel_duration: any ;
  location: any ;
  
  constructor(private calculateService : CalculateService) {
    

  }
  
 

  ngOnint(){
    this.reset();
  }

  reset(){
    this.location_distance=null;
    this.destination_address=null;
    this.origin_address=null;
    this.travel_duration=null;
    this.location=null;
  }

  async changeDistance(location: string)
  {



      var results = await this.calculateService.calDistance('jabalpur',location)
      results.subscribe(res=>{
      console.log(res)
      this.location_distance = res['rows']['0']['elements']['0']['distance']['text'];
      this.destination_address = res['destination_addresses'];
      this.origin_address = res['origin_addresses'];
      this.travel_duration = res['rows']['0']['elements']['0']['duration']['text'];
    
    }); 
  }
  

  async changeLocation(){
    await this.calculateService.getCurrentLoc();
  }
}