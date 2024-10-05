import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private answers: { [key: number]: string } = {};

  getSurveyQuestions(): { id: number, text: string }[] {
    return [
      { id: 1, text: 'Do you actively manage your household energy use?' },
      { id: 2, text: 'Do you frequently use a personal vehicle for commuting or daily travel?' },
      { id: 3, text: 'Do you regularly purchase new clothes, electronics, or other consumer products?' },
      { id: 4, text: 'Do you regularly recycle household waste?' }
    ];
  }

  saveAnswer(questionId: number, answer: string): void {
    this.answers[questionId] = answer;
  }

  generateSuggestions(): string[] {
    const suggestions: string[] = [];

    if (this.answers[1] === 'No') {
      suggestions.push('Use energy-efficient appliances.');
    }

    if (this.answers[2] === 'Yes') {
      suggestions.push('Use public transportation.');
    }

    return suggestions;
  }
}
