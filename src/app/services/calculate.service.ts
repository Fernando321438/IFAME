// chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';

/* const httpOptions = {
  headers:
  new HttpHeaders (
  {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8100/",
  }),
withCredentials: true,
}; */

@Injectable({
  providedIn: 'root'
})

export class CalculateService {
  url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric';
  key = 'AIzaSyBqoomDM6Xql_ACHrTAxgdrXl3SH8NhNuc';

  constructor(private readonly http: HttpClient, private readonly geolocation : Geolocation) { }


  

 async calDistance(origin:string,destination:string){
  
    var latlng=[];

    await this.geolocation.getCurrentPosition().then((resp) => {
      
      console.log('lattitude and logintudes are :',resp.coords.latitude,resp.coords.longitude);
      latlng[0]= resp.coords.latitude;
      latlng[1]=resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });

     return this.http.get(`${this.url}&origins=${latlng[0]},${latlng[1]}&destinations=${destination}&key=${this.key}`, /* httpOptions */);

  }

  
  async getCurrentLoc(){
    await this.geolocation.getCurrentPosition().then((resp) => {
     
      console.log('lattitude and logintudes are :',resp.coords.latitude,resp.coords.longitude);

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}