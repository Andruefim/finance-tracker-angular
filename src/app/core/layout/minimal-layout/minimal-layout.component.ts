import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';

@Component({
  selector: 'app-minimal-layout',
  imports: [
    RouterModule,
    ToolbarComponent,
  ],
  templateUrl: './minimal-layout.component.html',
  styleUrl: './minimal-layout.component.scss'
})
export class MinimalLayoutComponent {

}
