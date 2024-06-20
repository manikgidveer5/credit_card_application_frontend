import { Injectable } from '@angular/core';
import { Card, CardType } from '../Card.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CardHolderDetails } from '../CardHolderDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private apiUrl = 'http://localhost:8080/cards';
  private getByIdUrl = 'http://localhost:8080/card'
  private postUrl = 'http://localhost:8080/card/add';
  private putUrl = 'http://localhost:8080/card/edit';
  private searchUrl = 'http://localhost:8080/card/search';
  private cardType!: string;
  cardHolderDetails!: CardHolderDetails;

  constructor(private http: HttpClient) {}

  getAllCreditCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  getCreditCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.getByIdUrl}/${id}`);
  }

  addCreditCard(cardHolderDetails: CardHolderDetails, cardType: CardType ): Observable<void> {
    const url = `${this.postUrl}?cardType=${cardType}`; 
    console.log("post URL:- ",url)
    return this.http.post<void>(url, cardHolderDetails);
  }

  updateCreditCard(id: number, cardHolderDetails: CardHolderDetails): Observable<any> {
    return this.http.put<any>(`${this.putUrl}/${id}`, cardHolderDetails);
  }

  setCardHolderDetails(cardHolderDetails:CardHolderDetails) {
    this.cardHolderDetails = cardHolderDetails;
  }

  getCardHolderDetails() {
    return this.cardHolderDetails;
  }

  deleteCreditCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getByIdUrl}/${id}`);
  }

  searchCreditCards(term: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.searchUrl}?term=${term}`);
  }

  // for search result

  private searchResultsSubject = new BehaviorSubject<Card[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  setSearchResults(results: Card[]): void {
    this.searchResultsSubject.next(results);
  }

  // for CardType

  private cardTypeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  cardType$: Observable<string | null> = this.cardTypeSubject.asObservable();

  setCardType(cardType: string): void {
    this.cardType = cardType;
    this.cardTypeSubject.next(cardType);
  }

  getCardType(): string {
    console.log('card service get card type:- ', this.cardType);
    return this.cardType;
  }

}
