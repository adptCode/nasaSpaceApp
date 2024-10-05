import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private answers: { [key: number]: string } = {};

  getSurveyQuestions(): { id: number, text: string }[] {
    return [
      { id: 0, text: 'Do you actively manage your household energy use?' },
      { id: 1, text: 'Do you frequently use a personal vehicle for commuting or daily travel?' },
      { id: 2, text: 'Do you regularly purchase new clothes, electronics, or other consumer products?' },
      { id: 3, text: 'Do you regularly recycle household waste?' }
    ];
  }

  saveAnswer(questionId: number, answer: string): void {
    console.log(`Answer saved for question ${questionId}: ${answer}`);
    this.answers[questionId] = answer;
  }

  generateSuggestions(): string[] {
    console.log('Generating suggestions based on answers:', this.answers); // Log per verificare
    const suggestions: string[] = [];

    if (this.answers[0] === 'no') {
      suggestions.push('Use energy-efficient appliances.');
      console.log('Added suggestion: Use energy-efficient appliances.');
    }

    if (this.answers[1] === 'yes') {
      suggestions.push('Use public transportation.');
      console.log('Added suggestion: Use public transportation.');
    }

    if (this.answers[2] === 'yes') {
      suggestions.push('Reduce consumption by buying only what you need.');
      console.log('Added suggestion: Reduce consumption by buying only what you need.');
    }

    if (this.answers[3] === 'no') {
      suggestions.push('Start recycling household waste.');
      console.log('Added suggestion: Start recycling household waste.');
    }

    console.log('Suggestions generated:', suggestions); // Log per verificare
    return suggestions;
  }


  
}
