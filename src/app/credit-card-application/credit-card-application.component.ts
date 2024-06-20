import { Component, OnInit } from '@angular/core';
import { CardHolderDetails } from '../CardHolderDetails.model';
import { CreditCardService } from '../services/credit-card.service';
import { Card, CardType } from '../Card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CardStateService } from '../card-state.service';

@Component({
  selector: 'app-credit-card-application',
  templateUrl: './credit-card-application.component.html',
  styleUrls: ['./credit-card-application.component.css']
})
export class CreditCardApplicationComponent implements OnInit {

  cardHolderDetails: CardHolderDetails = new CardHolderDetails();
  checkboxChecked = false;
  cardType: string | null = null;
  isEditMode: boolean = false;
  cardId!: number;

  constructor(
    private cardTypeService: CreditCardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    console.log(this.cardHolderDetails.cardHolderName);

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.cardId = +params['id']; // convert to number
        this.cardTypeService.getCreditCardById(this.cardId).subscribe((card: Card) => {
          this.cardHolderDetails = card.cardHolderDetails;
          this.cardType = card.cardType;
        });
      }
    });

    this.cardHolderDetails = this.cardTypeService.getCardHolderDetails() || new CardHolderDetails();;
    this.cardType = this.cardTypeService.getCardType();
    console.log("From Application:- ",this.cardType);
    this.cardTypeService.cardType$.subscribe((type) => {
      this.cardType = type;
      console.log('Current card type:', type);
    });
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

      if (this.isEditMode) {
        console.log('Updating existing card');
        this.cardTypeService.updateCreditCard(this.cardId, this.cardHolderDetails).subscribe(() => {
          console.log('Card updated successfully');
          this.router.navigate(['/credit-card']);
        }, error => {
          console.error('Error updating card:', error);
        });
      } else {
        console.log('Adding new card');
        this.cardTypeService.addCreditCard(this.cardHolderDetails, cardTypeEnum).subscribe(() => {
          console.log('Card added successfully');
          this.router.navigate(['/credit-card']);
        }, error => {
          console.error('Error adding card:', error);
        });
      }
    } else {
      console.error('Card type is null');
    }
  }
}
