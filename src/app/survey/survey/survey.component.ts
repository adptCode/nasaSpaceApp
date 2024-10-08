import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";
import { QuestionCardComponent } from "../../shared/question-card/question-card.component";
import { SurveySummaryComponent } from '../survey-summary/survey-summary.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [ProgressBarComponent, QuestionCardComponent, SurveySummaryComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
})
export class SurveyComponent implements OnInit {

  currentQuestionIndex = 0;
  surveyForm!: FormGroup;
  questions: any[] = [];
  surveyComplete = false;

  constructor(private fb: FormBuilder, private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      answer: ['', Validators.required]
    });
    this.questions = this.surveyService.getSurveyQuestions();
  }

  nextQuestion(): void {
    if (this.surveyForm.valid) {
      this.surveyService.saveAnswer(this.currentQuestionIndex, this.surveyForm.value.answer);
      this.currentQuestionIndex++;
      this.surveyForm.reset();

      if (this.currentQuestionIndex >= this.questions.length) {
        this.surveyComplete = true;  // Imposta il sondaggio come completato
      }
    }
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

}
