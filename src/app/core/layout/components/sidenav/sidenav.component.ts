import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { map, Observable, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

interface NavLink {
  path: string;
  title: string;
  subselections?: NavLink[];
}

const NAV_LINKS_MAPPER: NavLink[] = [
  { path: '/dashboard', title: 'Dashboard' },
  { path: '/transactions', title: 'Transactions' },
  {
    path: '/categories',
    title: 'Categories',
    subselections: [
      { path: '/income', title: 'Icome' }
    ]
  },
  { path: '/budgeting', title: 'Budgeting' },
  { path: '/reports', title: 'Reports' },
  { path: '/settings', title: 'Settings' },
];

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterModule,
    AsyncPipe
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit {
  readonly router = inject(Router);
  readonly destroyRef = inject(DestroyRef);
  navLinksMapper = NAV_LINKS_MAPPER;
  @ViewChild('drawer') drawer!: MatDrawer;

  currentSubselections$: Observable<NavLink[] | null> = this.router.events
    .pipe(
      map(() => this.router.url),
      map(
        path => NAV_LINKS_MAPPER
          .find(navLink => navLink.path === path)?.subselections ?? null
      )
  )

  ngAfterViewInit() {
    this.toggleDrawer(this.router.url)
  }

  toggleDrawer(path: string): void {
    !this.hasSubselections(path) && this.drawer.toggle()
  }

  hasSubselections(path: string): boolean {
    return !!NAV_LINKS_MAPPER
      .find(navLink => navLink.path === path)?.subselections;
  }
}
