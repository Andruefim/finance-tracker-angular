import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { colors } from '../../../../constants';
import { DashboardService } from '../../services/dashboard.service';
import { TransactionsChartData } from '../../models/transactions-chart-data.model';

const mock = [
  {
    type: 'Income',
    data:
      [
        [ new Date('08.10.2024').getTime(), 2500 ],
        [ new Date('08.11.2024').getTime(), 3000 ],
        [ new Date('08.12.2024').getTime(), 2800 ]
      ]
  },
  {
    type: 'Expenses',
    data: [
      [ new Date('08.10.2024').getTime(), 2300 ],
      [ new Date('08.11.2024').getTime(), 2500 ],
      [ new Date('08.12.2024').getTime(), 2300 ]
    ]
  },
];;

@Component({
  selector: 'app-transactions-chart',
  imports: [HighchartsChartModule],
  templateUrl: './transactions-chart.component.html',
  styleUrl: './transactions-chart.component.scss'
})
export class TransactionsChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartData!: TransactionsChartData[];
  constructor(private dashboardService: DashboardService) { }


  chartOptions: Highcharts.Options = {
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
      title: {
        text: 'Month', style: { color: colors.CHART_GRID }
      },
      type: 'datetime',
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
    series: (this.chartData ?? mock)?.map(item => ({
      type: 'area',
      name: item.type,
      data: item.data,
    })),
  };
}
