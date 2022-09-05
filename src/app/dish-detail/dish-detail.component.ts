import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish, Comment } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  animations: [visibility(), expand()],
})
export class DishDetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  showPreview: boolean;
  dishcopy: Dish;
  visibility = 'shown';

  @ViewChild('cform') commentFormDirective: any;
  errMsg: string;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL: any
  ) {
    this.createCommentForm();
  }

  formatLabel = (value: number) => value;

  formErrors: any = {
    comment: '',
    author: '',
  };

  validationMessages: any = {
    comment: {
      required: 'Comment is required',
    },
    author: {
      required: 'Author is required',
      minlength: 'Last Name must be at least 2 characters long.',
    },
  };

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe({
      next: (dishIds) => (this.dishIds = dishIds),
      error: (err) => (this.errMsg = err),
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = 'hidden';
          return this.dishService.getDish(params['id']);
        })
      )
      .subscribe({
        next: (dish) => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        error: (err) => (this.errMsg = err),
      });
  }

  createCommentForm() {
    console.log('created form');

    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
      rating: [5],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: [new Date().toISOString()],
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) return;
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

    if (form.valid) {
      this.showPreview = true;
    } else {
      this.showPreview = false;
    }
  }

  submitComment() {
    this.comment = this.commentForm.value;
    this.dishcopy?.comments?.push(this.comment);
    this.dishService.putDish(this.dishcopy).subscribe({
      next: (dish) => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      error: (err) => (this.errMsg = err),
    });

    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
      date: [new Date().toISOString()],
    });
    this.commentFormDirective.resetForm({
      author: '',
      rating: 5,
      comment: '',
      date: [new Date().toISOString()],
    });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev =
      this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next =
      this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
