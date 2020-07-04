import { AppComponent } from './app.component';

let fixture: AppComponent;

describe('AppComponent Tests', () => {
  test("Title is 'Random Quote Generator Classic", () => {
    fixture = new AppComponent();
    expect(fixture.title).toBe('Random Quote Generator Classic');
  });
});
