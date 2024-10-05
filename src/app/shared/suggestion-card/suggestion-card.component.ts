import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion-card',
  standalone: true,
  imports: [],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.css'
})
export class SuggestionCardComponent {

  @Input()
  suggestion!: string;

}
