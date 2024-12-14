import { Component } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-expenses-chart',
  imports: [HighchartsChartModule],
  templateUrl: './expenses-chart.component.html',
  styleUrl: './expenses-chart.component.scss'
})
export class ExpensesChartComponent {
  Highcharts: typeof Highcharts = Highcharts;

  expenseCategoryData = [
    { category: 'Food', amount: 450 },
    { category: 'Transport', amount: 300 },
    { category: 'Rent', amount: 800 },
  ]

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
      data: this.expenseCategoryData.map(expense => [expense.category, expense.amount])
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
