import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from './Card.model';

@Injectable({
  providedIn: 'root'
})
export class CardStateService {
  private cardSource = new BehaviorSubject<Card | null>(null);
  currentCard = this.cardSource.asObservable();

  setCard(card: Card) {
    this.cardSource.next(card);
  }

  clearCard() {
    this.cardSource.next(null);
  }
}
