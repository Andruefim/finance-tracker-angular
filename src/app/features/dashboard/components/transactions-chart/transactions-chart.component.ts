import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { colors } from '../../../../constants';
import { DashboardService } from '../../services/dashboard.service';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-transactions-chart',
  imports: [HighchartsChartModule, AsyncPipe],
  templateUrl: './transactions-chart.component.html',
  styleUrl: './transactions-chart.component.scss'
})
export class TransactionsChartComponent {
  readonly dashboardService = inject(DashboardService);
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions$: Observable<Highcharts.Options> = this.dashboardService.dashboardData$.pipe(
    map(({ transactionsChartData }) => ({
      ...this.baseChartOptions,
      series: transactionsChartData?.map(chartData => ({
        type: 'area',
        name: chartData.type,
        data: chartData.data,
      }))
    }))
  )


  baseChartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: '',
    },
    legend: {
      itemStyle: {
        color: colors.CHART_GRID,
        opacity: 1
      },
      itemHoverStyle: {
        color: colors.CHART_GRID,
        opacity: 0.5
      }
    },
    title: {
      text: 'Monthly Income and Expenses',
      style: {
        display: 'none'
      }
    },
    xAxis: {
      type: 'category',
      labels: {
        style: { color: colors.CHART_GRID }
      },
    },
    yAxis: {
      title: { text: 'Amount', style: { color: colors.CHART_GRID } },
      labels: {
        style: { color: colors.CHART_GRID }
      }
    },
    series: [],
  };
}
