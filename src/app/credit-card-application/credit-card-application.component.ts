import { Component, OnInit } from '@angular/core';
import { CardHolderDetails } from '../CardHolderDetails.model';
import { ActivatedRoute } from '@angular/router';
import { CreditCardService } from '../services/credit-card.service';
import { Card, CardType } from '../Card.model';

@Component({
  selector: 'app-credit-card-application',
  templateUrl: './credit-card-application.component.html',
  styleUrls: ['./credit-card-application.component.css']
})
export class CreditCardApplicationComponent implements OnInit {

  cardHolderDetails: CardHolderDetails = new CardHolderDetails();
  checkboxChecked = false;
  cardType: string | null = null;

  selectedCardType!: string;
  creditCard!: Card;

  constructor(private route: ActivatedRoute, private cardTypeService: CreditCardService) { }

  ngOnInit(): void {    
    const cardTypeParam = this.route.snapshot.paramMap.get('cardType');
    this.selectedCardType = cardTypeParam ? cardTypeParam : 'DefaultCardType';
    this.cardTypeService.getCardType()
      .subscribe(cardType => this.cardType = cardType);
  }

  onSubmit() {
    console.log('Form submitted:', this.cardHolderDetails);

    if (this.cardType) {
      let cardTypeEnum: CardType;
      switch (this.cardType) {
        case 'VISA':
          cardTypeEnum = CardType.VISA;
          break;
        case 'MASTERCARD':
          cardTypeEnum = CardType.MASTERCARD;
          break;
        case 'RUPAY':
          cardTypeEnum = CardType.RUPAY;
          break;
        default:
          cardTypeEnum = CardType.VISA;
          break;
      }

      const creditCard: Card = {
        cardNumber: this.generateCardNumber(),
        cardName: 'Credit Card',
        expiryDate: this.generateExpiryDate(),
        cvv: this.generateCVV(),
        cardType: cardTypeEnum,
        cardHolderDetails: this.cardHolderDetails
      };
      
      this.cardTypeService.addCreditCard(creditCard)
        .subscribe(() => {
          console.log('Card added successfully',creditCard);
        }, error => {
          console.error('Error adding card:', error);
        });
    } else {
      console.error('Card type is null');
    }
  }

  private generateCardNumber(): number {
    // Generate a 16-digit random card number
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
  }

  private generateExpiryDate(): string {
    // Generate a random expiry date in MM/YYYY format
    const month = Math.floor(Math.random() * 12) + 1;
    const year = new Date().getFullYear() + Math.floor(Math.random() * 5); // Expires within the next 5 years
    return `${('0' + month).slice(-2)}/${year}`;
  }

  private generateCVV(): number {
    // Generate a 3-digit CVV
    return Math.floor(100 + Math.random() * 900);
  }
}

