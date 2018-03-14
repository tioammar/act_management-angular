import { TodolistPage } from './app.po';

describe('todolist App', () => {
  let page: TodolistPage;

  beforeEach(() => {
    page = new TodolistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
