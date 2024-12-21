import { Component, inject, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardService } from '../../services/dashboard.service';
import { ExpensesChartData, ExpensesData } from '../../models/expenses-chart-data.model';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-expenses-chart',
  imports: [
    HighchartsChartModule,
    AsyncPipe
  ],
  templateUrl: './expenses-chart.component.html',
  styleUrl: './expenses-chart.component.scss',
})
export class ExpensesChartComponent {
  readonly dashboardService = inject(DashboardService);
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions$: Observable<Highcharts.Options> = this.dashboardService.dashboardData$.pipe(
    map(({ expensesChartData }) => ({
      ...this.baseChartOptions,
      series: [{
        ...this.seriesOptions,
        data: expensesChartData
      }]
    }))
  )


  seriesOptions: Highcharts.SeriesPieOptions = {
    type: 'pie',
    innerSize: '75%',
    borderRadius: 8,
  }

  baseChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: '',
    },
    title: {
      text: 'Expenses by Category',
      style: {
         display: 'none'
      }
    },
    series: [],
    plotOptions: {
      pie: {
        opacity: 0.85,
      }
    }
  };
}
