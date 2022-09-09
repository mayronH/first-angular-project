import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

import { environment } from 'src/environments/environment';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseAPIUrl = environment.baseAPIUrl;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((moment) => {
      this.moment = moment.data;
    });
  }

  async removeMoment() {
    if (this.moment) {
      await this.momentService.removeMoment(this.moment.id!).subscribe();

      this.messagesService.add('Moment Deleted Successfully');

      this.router.navigate(['/']);
    }
  }
}
