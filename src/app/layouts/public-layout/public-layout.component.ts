import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss',
})
export class PublicLayoutComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  menuOpen = false;
  readonly currentYear = new Date().getFullYear();

  readonly navLinks = [
    { label: 'Templates',  path: '/templates' },
    { label: 'Pricing',    path: '/pricing' },
    { label: 'About',      path: '/about' },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // close mobile menu on resize to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) this.menuOpen = false;
      });
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
