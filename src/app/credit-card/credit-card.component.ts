import { Component, OnInit } from '@angular/core';
import { Card, CardType } from '../Card.model';
import { CreditCardService } from '../services/credit-card.service';
import { Router } from '@angular/router';
import { CardStateService } from '../card-state.service';
import { CardHolderDetails } from '../CardHolderDetails.model';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
})
export class CreditCardComponent implements OnInit {
  creditCards: Card[] = [];
  searchTerm: string = '';
  searchResults: Card[] = [];
  displayResults: boolean = false;

  constructor(
    private creditCardService: CreditCardService,
    private router: Router
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
    this.creditCardService.getAllCreditCards().subscribe((creditCards) => {
      this.creditCards = creditCards;
      console.log('Credit Cards:', creditCards);
    });
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.creditCardService.searchCreditCards(this.searchTerm).subscribe(
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

  isRuPay(card: Card): boolean {
    return card.cardType === CardType.RUPAY;
  }

  // editCard(card: Card) {
  //   const cardHolderDetails: CardHolderDetails = {
  //     cardHolderId: card.cardHolderDetails.cardHolderId,
  //     cardHolderName: card.cardHolderDetails.cardHolderName,
  //     email: card.cardHolderDetails.email,
  //     contactNo: card.cardHolderDetails.contactNo,
  //     card: card.cardHolderDetails.card
  //   };

  //   this.creditCardService.setCardHolderDetails(card.cardHolderDetails);
  //   this.creditCardService.setCardType(card.cardType);

  //   this.creditCardService.updateCreditCard(card.cardID, cardHolderDetails).subscribe(() => {
  //     console.log('Card updated successfully', card);
  //     this.cardStateService.setCard(card);
  //     this.router.navigate(['/update-card'], { state: { card } });
  //   });
  // }

  editCard(card: Card) {
    this.router.navigate(['/update-card', card.cardID]);
  }

  deleteCard(card: Card) {
    this.creditCardService.deleteCreditCard(card.cardID).subscribe(() => {
      this.creditCards = this.creditCards.filter(
        (c) => c.cardID !== card.cardID
      );
      this.searchResults = this.searchResults.filter(
        (c) => c.cardID !== card.cardID
      );
    });
    console.log('Delete card', card);
  }
}
