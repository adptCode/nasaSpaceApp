import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.css'
})
export class SuggestionCardComponent {

  @Input()
  suggestion!: string;


}
