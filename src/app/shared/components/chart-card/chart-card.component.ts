import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-card',
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss'
})
export class ChartCardComponent {
  @Input() title: string = '';
}
