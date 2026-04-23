import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button';
import { Router, RouterLink } from '@angular/router';
import { FeedbackStore } from '../../shared/feedback.store';
import { Badge } from '../../components/badge/badge';
import { TextFieldComponent } from '../../components/text-field/text-field';
import { DropdownComponent } from '../../components/dropdown/dropdown';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CATEGORY_OPTIONS, ProductRequest } from '../../shared/feedback.model';
import { Select } from '../../components/select/select';

@Component({
  selector: 'app-new-feedback',
  imports: [
    ButtonComponent,
    RouterLink,
    TextFieldComponent,
    ButtonComponent,
    DropdownComponent,
    ReactiveFormsModule,
    Select,
  ],
  templateUrl: './new-feedback.html',
  styleUrl: './new-feedback.css',
})
export class NewFeedback implements OnInit {
  store = inject(FeedbackStore);
  router = inject(Router);
  addFeedbackFrom!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  categoryDropdownItem = CATEGORY_OPTIONS.filter((co) => co.value !== 'all');

  createForm() {
    this.addFeedbackFrom = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      detail: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.addFeedbackFrom.markAllAsTouched();
    if (this.addFeedbackFrom.invalid) return;
    const formData = this.addFeedbackFrom.value;
    const newFeedback: Omit<ProductRequest, 'id'> = {
      title: formData.title,
      category: formData.category as Category,
      description: formData.detail,
      status: 'suggestion',
      upvotes: 0,
      comments: [],
    };

    this.store.addRequest(newFeedback);
    this.router.navigate(['/']);
  }

  getSelected() {}
}
