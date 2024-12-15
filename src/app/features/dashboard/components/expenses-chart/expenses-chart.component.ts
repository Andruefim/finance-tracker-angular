import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardService } from '../../services/dashboard.service';
import { ExpensesData } from '../../models/expenses-chart-data.model';

const mock: ExpensesData[] = [
  [ 'Food', 450 ],
  [ 'Transport', 300 ],
  [ 'Rent', 800 ],
]

@Component({
  selector: 'app-expenses-chart',
  imports: [HighchartsChartModule],
  templateUrl: './expenses-chart.component.html',
  styleUrl: './expenses-chart.component.scss'
})
export class ExpensesChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  expensesData: ExpensesData[] = mock;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService
      .getExpensesChartData()
      .subscribe({
        next: (result) => {
          this.expensesData = result;
        },
        error: err => {
          console.error(err);
        }
      })
  }

  chartOptions: Highcharts.Options = {
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
    series: [{
      type: 'pie',
      innerSize: '75%',
      borderRadius: 8,
      data: this.expensesData,
    }],
    plotOptions: {
      pie: {
        opacity: 0.85,
      }
      //pie: {
      //  colors: Highcharts.getOptions().colors!.map((c, i) => constants.CHART_COLORS[i] ?? c),
      //}
    }
  };
}
