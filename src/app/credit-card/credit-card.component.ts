import { Component, OnInit } from '@angular/core';
import { Card, CardType } from '../Card.model';
import { CreditCardService } from '../services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  creditCards: Card[] = [];
  searchTerm: string = '';
  searchResults: Card[] = [];
  displayResults: boolean = false;

  constructor(
    private creditCardService: CreditCardService
  ) {}

  ngOnInit(): void {
    this.loadCreditCards();
    this.creditCardService.searchResults$.subscribe(
      (results) => {
        this.searchResults = results;
        this.displayResults = results.length > 0;
        console.log('Received search results:', results);
      },
      (error) => {
        console.error('Error receiving search results:', error);
      }
    );
  }

  loadCreditCards(): void {
    this.creditCardService.getAllCreditCards()
      .subscribe(creditCards => {
        this.creditCards = creditCards;
        console.log('Credit Cards:', creditCards);
      });
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.creditCardService.searchCreditCards(this.searchTerm)
        .subscribe(
          (data: Card[]) => {
            this.searchResults = data;
            this.displayResults = data.length > 0;
            console.log('Search results:', data);
          },
          (error) => {
            console.error('Error searching cards:', error);
          }
        );
    } else {
      this.searchResults = [];
      this.displayResults = false;
    }
  }

  isMasterCard(card: Card): boolean {
    return card.cardType === CardType.MASTERCARD;
  }

  isVisa(card: Card): boolean {
    return card.cardType === CardType.VISA;
  }
}
