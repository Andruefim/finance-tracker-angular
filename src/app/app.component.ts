import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
      RouterModule,
      MatSidenavModule,
      MatListModule,
      ToolbarComponent,
      SidenavComponent
    ],
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
        console.log('weatherResult', result)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'angularwithasp.client';
}
