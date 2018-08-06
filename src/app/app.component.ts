import { Component, OnInit } from '@angular/core';
import { Http } from '../../node_modules/@angular/http';

const openWeatherMapAPIKey = '67b4853750258ee0e85ca441f3ae0e62';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: Http){}

  selectedLat: number;
  selectedLng: number;
  harborList: any[];

  ngOnInit(){
    this.http.get('https://devapi.harba.co/harbors/visible')
    .map(res => res.json())
    .subscribe(harborList => {
      harborList.forEach( harbor => {
        harbor.showInfoWindow = false;
      });
      this.harborList = harborList;
      this.selectedLat = parseInt(this.harborList[0].lat);
      this.selectedLng = parseInt(this.harborList[0].lon);
      console.log(this.harborList);
    });
  }

  getInt(value: string){
    return parseInt(value);
  }

  getWeather(targetHarbor: any){
    this.http.get('https://api.openweathermap.org/data/2.5/weather?lat='+ targetHarbor.lat +'&lon=' + targetHarbor.lon + '&appid=' + openWeatherMapAPIKey)
      .map(res=> res.json())
      .subscribe(harborWeather => {
        this.harborList.forEach( harbor => {
          if(targetHarbor.id === harbor.id){
            harborWeather.provider = 'OpenWeatherMap';
            harbor.weather = harborWeather;
            harbor.showInfoWindow = !harbor.showInfoWindow;
          }else{
            harbor.showInfoWindow = false;
          }
        });
      });
  }

}
