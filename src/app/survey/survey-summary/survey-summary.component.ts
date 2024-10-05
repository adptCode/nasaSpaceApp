import { Component } from '@angular/core';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-survey-summary',
  standalone: true,
  imports: [],
  templateUrl: './survey-summary.component.html',
  styleUrl: './survey-summary.component.css'
})
export class SurveySummaryComponent {

  suggestions: string[] = [];

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.suggestions = this.surveyService.generateSuggestions();
  }

}
