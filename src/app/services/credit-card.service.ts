import { Injectable } from '@angular/core';
import { Card } from '../Card.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private apiUrl = 'http://localhost:8080/cards';
  private postUrl = 'http://localhost:8080/card/edit';
  private searchUrl = 'http://localhost:8080/card/search';

  constructor(private http: HttpClient) {}

  getAllCreditCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  getCreditCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${id}`);
  }

  addCreditCard(creditCard: Card): Observable<void> {
    return this.http.post<void>(this.postUrl, creditCard);
  }

  updateCreditCard(id: number, creditCard: Card): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, creditCard);
  }

  deleteCreditCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCreditCards(term: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.searchUrl}?term=${term}`);
  }

  //for search result

  private searchResultsSubject = new BehaviorSubject<Card[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  setSearchResults(results: Card[]): void {
    this.searchResultsSubject.next(results);
  }

  // for CardType

  private cardTypeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  cardType$: Observable<string | null> = this.cardTypeSubject.asObservable();

  setCardType(cardType: string | null): void {
    this.cardTypeSubject.next(cardType);
  }

  getCardType(): Observable<string | null> {
    return this.cardType$;
  }
  

}
