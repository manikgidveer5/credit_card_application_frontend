import { Card } from "./Card.model";

export class CardHolderDetails {
    cardHolderId!: number;
    cardHolderName!: string;
    email!: string;
    contactNo!: number;
    card: Card = new Card();

    constructor() {
        this.card = new Card();
    }
}