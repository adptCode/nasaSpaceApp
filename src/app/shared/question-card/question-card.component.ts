import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {

  questionForm: FormGroup;

  @Input()
  question!: { id: number, text: string };

  @Input()
  form!: FormGroup;

  constructor() {
    this.questionForm = new FormGroup({
      formControl: new FormControl('') // Ensure this is FormControl
    });
  }

}
