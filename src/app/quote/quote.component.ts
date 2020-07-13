import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../quote.service';
import { Quotes } from '../quotes';
import { Quote } from '../quote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
  quotes: Quotes;
  quote: Quote;

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
      this.quote = this.getRandomQuote();
    });
  }

  getRandomQuote(): Quote {
    return this.quotes.quotes[
      Math.floor(Math.random() * this.quotes.quotes.length)
    ];
  }

  onClick() {
    this.quote = this.getRandomQuote();
  }

  getTwitterLink() {
    return `http://twitter.com/intent/tweet?text=${encodeURI(
      this.quote.quote
    )}`;
  }
}
