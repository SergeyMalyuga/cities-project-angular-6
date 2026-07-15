import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NewComment} from '../../core/models/new-comment';
import {CommentService} from '../../core/services/comment.service';

@Component({
  selector: 'app-comment-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './comment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent {
  @Input({required: true}) offerId!: string | null;
  @Output() commentAdded = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  private commentService = inject(CommentService);

  public commentForm: FormGroup = this.fb.group({
    rating: ['', [Validators.required]],
    comment: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(356)]],
  });

  public onSubmit() {
    if (this.commentForm.valid && this.offerId) {
      const {rating, comment} = this.commentForm.value;
      const newComment: NewComment = {rating: Number(rating), comment};
      this.commentService.postComment(this.offerId, newComment).subscribe(() => {
        this.commentForm.reset();
        this.commentAdded.emit();
      })
    }
  }
}
