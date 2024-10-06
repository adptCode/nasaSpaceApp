import { Component, OnInit } from '@angular/core';
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
export class SurveySummaryComponent implements OnInit {

  suggestions: { category: string, tasks: string[] }[] = [];
  answers: { [key: number]: string } = {}; // Le risposte dell'utente
  submissionMessage: string = '';  // Messaggio di conferma dopo l'invio dei dati

  iconMap: { [key: string]: { icon: string, color: string } } = {
    'Energy': { icon: 'bolt', color: '#ff9800' },
    'Transportation': { icon: 'directions_car', color: '#2196f3' },
    'Consumption': { icon: 'shopping_cart', color: '#9c27b0' },
    'Recycling': { icon: 'recycling', color: '#4caf50' },
    'Well done!': { icon: 'thumb_up', color: '#4caf50' }
  };

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.suggestions = this.surveyService.generateSuggestions();
    this.answers = this.surveyService.getAnswers();  // Assumiamo che il servizio tenga traccia delle risposte
  }

  // Funzione per ottenere l'icona in base alla categoria
  getIconForCategory(category: string): string {
    return this.iconMap[category]?.icon || 'help'; // 'help' di default se la categoria non esiste
  }

  // Funzione per ottenere il colore in base alla categoria
  getIconColor(category: string): string {
    return this.iconMap[category]?.color || '#000000'; // Nero di default se la categoria non esiste
  }

   // Funzione per inviare i risultati al backend
   saveResults(): void {
    const payload = {
      userId: '12345',  // Puoi sostituirlo con un ID utente reale
      answers: this.answers,
      suggestions: this.suggestions
    };

    console.log(payload)

    this.surveyService.saveResults(payload).subscribe({
      next: response => {
        this.submissionMessage = 'Data submitted successfully!';
      },
      error: error => {
        this.submissionMessage = 'Error while submitting data.';
      }
    });
  }

  // Funzione per ripetere il questionario
  repeatSurvey(): void {
    this.surveyService.resetAnswers();  // Resetta le risposte nel servizio
    window.location.reload();  // Ricarica la pagina per ricominciare il questionario
  }

}
