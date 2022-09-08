import { Component, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  moments!: Array<Moment>;
  filteredMoments: Array<Moment> = [];

  baseAPIUrl = environment.baseAPIUrl;

  faSearch = faSearch;
  searchInput: string = '';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getAllMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.moments = data;
      this.filteredMoments = data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.filteredMoments = this.moments.filter((moment) => {
      return moment.title.toLowerCase().includes(value.toLowerCase());
    });
  }
}
