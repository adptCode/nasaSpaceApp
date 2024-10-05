import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {

  @Input()
  question!: { id: number, text: string };

  @Input()
  form!: FormGroup;

  get answerControl(): FormControl {
    return this.form.get('answer') as FormControl;
  }

}
