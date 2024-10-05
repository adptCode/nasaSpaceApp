import { Component } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { SuggestionCardComponent } from '../../shared/suggestion-card/suggestion-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-summary',
  standalone: true,
  imports: [CommonModule, SuggestionCardComponent],
  templateUrl: './survey-summary.component.html',
  styleUrl: './survey-summary.component.css'
})
export class SurveySummaryComponent {

  suggestions: string[] = [];

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.suggestions = this.surveyService.generateSuggestions();
    console.log('Suggestions received in SurveySummaryComponent:', this.suggestions);
  }

}
