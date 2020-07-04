import { QuoteComponent } from './quote.component';
import { of } from 'rxjs';

//jest.mock('../quote.service');

let fixture: QuoteComponent;
let quoteServiceMock;

let response = {
  quotes: [
    {
      quote: "d'oh",
      author: 'Homer S',
    },
  ],
};

quoteServiceMock = {
  // mock return value from
  getQuotes: jest.fn().mockReturnValue(of(response)),
};

describe('QuoteComponent Tests', () => {
  beforeEach(() => {
    // create an instance of the class we are testing
    fixture = new QuoteComponent(quoteServiceMock);
  });

  test('ngOnInit must call getQuotes ', () => {
    const spy = jest
      // watches to see if getQuotes in QuoteComponent is called
      .spyOn(fixture, 'getQuotes')
      // We aren't testing the functionality of getQuotes, just that it gets tested so in this case
      // we'll make a mock with it no implementation (getQuotes returns void)
      .mockImplementation();
    // call ngOnInit
    fixture.ngOnInit();
    // test that getQuotes is called
    expect(spy).toHaveBeenCalled();
  });

  test('QuoteComponent getQuotes calls QuoteServer getQuotes', () => {
    fixture.getQuotes();
    expect(quoteServiceMock.getQuotes).toHaveBeenCalled();
  });

  test('QuoteComponent getQuotes sets quotes property to the return value of the observable', () => {
    fixture.getQuotes();
    expect(fixture.quotes).toEqual(response);
  });

  test('getRandomQuote is called when running getQuotes and sets component property quote', () => {
    const spy = jest
      .spyOn(fixture, 'getRandomQuote')
      .mockReturnValue(response.quotes[0]);
    fixture.getQuotes();
    expect(spy).toHaveBeenCalled();
    expect(fixture.quote).toEqual(response.quotes[0]);
  });

  test('test that single quote returns 0 when randomised', () => {
    fixture.quotes = response;
    let result = fixture.getRandomQuote();
    expect(result).toEqual(response.quotes[0]);
  });

  test('onClick calls getRandomQuote', () => {
    const spy = jest.spyOn(fixture, 'getRandomQuote').mockImplementation();
    fixture.onClick();
    expect(spy).toHaveBeenCalled();
  });

  test('getTwitterLink returns encoded URL', () => {
    fixture.quote = response.quotes[0];
    let encodedQuote = encodeURI(fixture.quote.quote);
    expect(fixture.getTwitterLink()).toBe(
      `http://twitter.com/intent/tweet?text=${encodedQuote}`
    );
  });
});
