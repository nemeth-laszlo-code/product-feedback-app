import { afterNextRender, Component, effect, inject } from '@angular/core';
import { FeedbackStore } from '../../shared/feedback.store';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextFieldComponent } from '../../components/text-field/text-field';
import { ButtonComponent } from '../../components/button/button';
import { DropdownComponent } from '../../components/dropdown/dropdown';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  Category,
  CATEGORY_OPTIONS,
  ProductRequest,
  Status,
  STATUS_OPTIONS,
} from '../../shared/feedback.model';

@Component({
  selector: 'app-edit-feedback',
  imports: [
    ReactiveFormsModule,
    TextFieldComponent,
    ButtonComponent,
    DropdownComponent,
    RouterLink,
  ],
  templateUrl: './edit-feedback.html',
  styleUrl: './edit-feedback.css',
})
export class EditFeedback {
  store = inject(FeedbackStore);
  route = inject(ActivatedRoute);
  router = inject(Router);

  editFeedbackFrom!: FormGroup;
  categoryDropdownItems = CATEGORY_OPTIONS.filter((co) => co.value !== 'all');
  statusDropdownItems = STATUS_OPTIONS;

  constructor() {
    afterNextRender(() => {
      const request = this.store.selectedRequest();
      if (request) {
        this.patchForm(request);
      }
    });

    effect(() => {
      const request = this.store.selectedRequest();
      if (request && this.editFeedbackFrom) {
        this.patchForm(request);
      }
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.selectRequest(Number(id));
    }

    this.createForm();
  }

  createForm() {
    const r = this.store.selectedRequest();

    this.editFeedbackFrom = new FormGroup({
      title: new FormControl(r?.title ?? '', Validators.required),
      category: new FormControl(r?.category ?? '', Validators.required),
      status: new FormControl(r?.status ?? '', Validators.required),
      detail: new FormControl(r?.description ?? '', Validators.required),
    });
  }
  private patchForm(request: ProductRequest): void {
    this.editFeedbackFrom.patchValue({
      title: request.title,
      category: request.category,
      status: request.status,
      detail: request.description,
    });
  }

  onSubmit() {
    this.editFeedbackFrom.markAllAsTouched();
    if (this.editFeedbackFrom.invalid) return;

    const current = this.store.selectedRequest();
    if (!current) return;

    const updated: ProductRequest = {
      ...current,
      title: this.editFeedbackFrom.value.title,
      category: this.editFeedbackFrom.value.category as Category,
      status: this.editFeedbackFrom.value.status as Status,
      description: this.editFeedbackFrom.value.detail,
    };

    this.store.updateRequest(updated);
    this.router.navigate(['/']);
  }

  onDelete(id: number) {
    this.store.deleteRequest(id);
    this.router.navigate(['/']); // ✅ navigálj vissza törlés után
  }
}
