import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  sidebarOpen = signal(true);

  readonly navItems: NavItem[] = [
    { icon: '🏠', label: 'Overview',       path: '/dashboard' },
    { icon: '📄', label: 'My Documents',   path: '/dashboard/documents' },
    { icon: '💳', label: 'Payments',       path: '/dashboard/payments' },
    { icon: '⬇️',  label: 'Downloads',     path: '/dashboard/downloads' },
    { icon: '🔖', label: 'Saved Templates', path: '/dashboard/saved-templates' },
    { icon: '🧾', label: 'Billing',        path: '/dashboard/billing' },
    { icon: '👤', label: 'Profile',        path: '/dashboard/profile' },
  ];

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }
}
