import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Album } from '../../../models/album';

@Component({
  selector: 'app-disc-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './disc-item.html',
  styleUrl: './disc-item.scss',
})
export class DiscItemComponent {
  @Input({ required: true }) album!: Album;

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/disc', this.album.id]);
  }
}
