import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCardService } from '../services/credit-card.service';
import { AuthService } from '../auth.service';
import { Card } from '../Card.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn = false;  
  searchTerm: string = '';
  searchResults: Card[] = [];

  constructor(
    private router: Router,
    private cardTypeService: CreditCardService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  selectedCard: string | null = null;

  selectCard(cardType: string): void {
    this.router.navigate(['/apply', cardType]);
    this.cardTypeService.setCardType(cardType);
  }

  search() {
    console.log("response: ",this.searchTerm);
    this.cardTypeService.searchCreditCards(this.searchTerm).subscribe(
      (response) => {
        // Process the search results
        console.log('Search results:', response);
        this.searchResults = response;
        this.cardTypeService.setSearchResults(response);
      },
      (error) => {
        console.error('Error searching cards:', error);
      }
    );
  }
  

}
