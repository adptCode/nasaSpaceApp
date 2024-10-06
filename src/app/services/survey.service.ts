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

  // Genera suggerimenti multipli per ogni categoria
  generateSuggestions(): { category: string, tasks: string[] }[] {
    const suggestions: { category: string, tasks: string[] }[] = [];

    // Energia
    if (this.answers[0] === 'no') {
      suggestions.push({
        category: 'Energy',
        tasks: [
          'Unplug electronics like your phone charger, TV, and computer when not in use.',
          'Switch off lights when leaving a room and rely on natural daylight during the day.',
          'Set your thermostat 1-2 degrees lower in winter and higher in summer.',
          'Air-dry clothes on a drying rack instead of using the dryer for small loads.'
        ]
      });
    }

    // Trasporti
    if (this.answers[1] === 'yes') {
      suggestions.push({
        category: 'Transportation',
        tasks: [
          'Bike or walk to run errands within 2-3 kilometers instead of driving.',
          'Plan car trips efficiently by combining errands in one trip.',
          'Use public transportation for your daily commute at least once a week.',
          'Keep your car tires properly inflated to improve fuel efficiency.'
        ]
      });
    }

    // Consumo
    if (this.answers[2] === 'yes') {
      suggestions.push({
        category: 'Consumption',
        tasks: [
          'Pack lunch in reusable containers to avoid disposable packaging.',
          'Have at least one meat-free day per week by preparing plant-based meals.',
          'Buy only what you need, focusing on local and seasonal products.',
          'Repair or upcycle something old instead of buying new items.'
        ]
      });
    }

    // Riciclaggio
    if (this.answers[3] === 'no') {
      suggestions.push({
        category: 'Recycling',
        tasks: [
          'Sort recyclables at the end of each day: paper, plastic, glass, and metal.',
          'Compost vegetable and fruit scraps instead of throwing them away.',
          'Take reusable shopping bags to avoid single-use plastic bags.',
          'Recycle e-waste like old phones, chargers, and batteries.'
        ]
      });
    }

    // Se non ci sono suggerimenti specifici, mostra un messaggio positivo con suggerimenti generici
    if (suggestions.length === 0) {
      suggestions.push({
        category: 'Well done!',
        tasks: [
          'Your daily behavior already contributes to reducing carbon emissions.',
          'Remember these general tips to maintain a sustainable lifestyle:',
          'Always turn off unused electronics.',
          'Use public transportation or walk whenever possible.',
          'Continue reducing waste and recycling.'
        ]
      });
    }

    return suggestions;
  }
}





