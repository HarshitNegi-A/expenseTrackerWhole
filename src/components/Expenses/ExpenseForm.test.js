import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ExpenseForm from './ExpenseForm';

const mockStore = configureStore([]);

describe('ExpenseForm Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      expenses: { expenses: [] },
      auth: { userId: 'user@test.com' },
      theme: { isDarkTheme: false }
    });
  });

  test('renders "EXPENSE TRACKER" heading', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('EXPENSE TRACKER')).toBeInTheDocument();
  });

  test('renders "Amount:" label', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Amount:')).toBeInTheDocument();
  });

  test('renders "Description:" label', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Description:')).toBeInTheDocument();
  });

  test('renders "Category" label', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  test('renders category option "Food"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  test('renders category option "Petrol"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Petrol')).toBeInTheDocument();
  });

  test('renders category option "Shopping"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Shopping')).toBeInTheDocument();
  });

  test('renders category option "Travel"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Travel')).toBeInTheDocument();
  });

  test('renders category option "Other"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  test('renders total expenses conditional text', () => {
    store = mockStore({
      expenses: { expenses: [{ amount: 5000 }, { amount: 6000 }] }, // Total is 11000
      auth: { userId: 'user@test.com' },
      theme: { isDarkTheme: false }
    });
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpenseForm />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Activate Premium')).toBeInTheDocument();
  });
});