import { CardHolderDetails } from "./CardHolderDetails.model";

export class Card {
  cardID!: number;
  cardNumber!: number;
  cardName!: string;
  cardType!: CardType;
  expiryDate!: string;
  cvv!: number;
  cardHolderDetails!: CardHolderDetails;
  }
  

  export enum CardType {
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD',
    RUPAY = "RUPAY"
  }