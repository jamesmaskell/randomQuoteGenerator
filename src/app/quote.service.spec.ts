import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuoteService } from './quote.service';
import { doesNotReject } from 'assert';

describe('QuoteServices tests', () => {
  // create empty variables for instances of class required
  let httpMock: HttpTestingController;
  let fixture: QuoteService;

  // before each test....
  beforeEach(() => {
    // inject
    TestBed.configureTestingModule({
      providers: [QuoteService],
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.get(QuoteService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('Check that API call returns a mock response', (done) => {
    let response = {
      quotes: [
        {
          quote: "d'oh",
          author: 'Homer S',
        },
      ],
    };

    fixture.getQuotes().subscribe((result) => {
      // test response from mock API is equal to the mock response configured for the test
      expect(result).toEqual(response);
      done();
    });

    console.log('after get quotes', 4);
    const req = httpMock.expectOne(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    );

    // test that the method called is a GET method.
    expect(req.request.method).toBe('GET');
    // push everything through the mock API
    req.flush(response);
  });
});
