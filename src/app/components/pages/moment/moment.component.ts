import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Moment } from 'src/app/interfaces/Moment';
import { Comment } from 'src/app/interfaces/Comment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

import { environment } from 'src/environments/environment';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  baseAPIUrl = environment.baseAPIUrl;

  moment?: Moment;

  commentForm!: FormGroup;
  submitted: boolean = false;

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((moment) => {
      this.moment = moment.data;
    });

    this.commentForm = this.fb.group({
      username: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  async removeMoment() {
    if (this.moment) {
      this.momentService.removeMoment(this.moment.id!).subscribe();

      this.messagesService.add('Moment Deleted Successfully');

      this.router.navigate(['/']);
    }
  }

  async createNewComment() {
    this.submitted = true;

    if (this.commentForm.invalid) return;

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    this.commentService.addComment(data).subscribe((comment) => {
      this.moment!.comments!.push(comment.data);
    });

    this.messagesService.add('Comment Add');

    this.commentForm.reset();
    this.submitted = false;
  }
}
