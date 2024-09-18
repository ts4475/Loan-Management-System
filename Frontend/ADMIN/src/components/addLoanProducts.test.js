import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import AddLoanProducts from '../components/AddLoanProduct';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('AddLoanProducts Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('renders AddLoanProducts component', () => {
    render(
      <MemoryRouter initialEntries={['/add-loan-products/1']}>
        <Routes>
          <Route path='/add-loan-products/:vendorId' element={<AddLoanProducts />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Add Loan Products')).toBeInTheDocument();
    expect(screen.getByText('Choose Loan Products:')).toBeInTheDocument();
  });

  test('handles product selection and input changes', () => {
    render(
      <MemoryRouter initialEntries={['/add-loan-products/1']}>
        <Routes>
          <Route path='/add-loan-products/:vendorId' element={<AddLoanProducts />} />
        </Routes>
      </MemoryRouter>
    );

    // Select Gold product
    fireEvent.click(screen.getByLabelText('Gold'));
    expect(screen.getByLabelText('Interest Rate:')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Interest Rate:'), { target: { value: '5.5' } });
    fireEvent.change(screen.getByLabelText('Processing Fee:'), { target: { value: '1.0' } });
    fireEvent.change(screen.getByLabelText('PrePayment Charges:'), { target: { value: '0.5' } });
    fireEvent.change(screen.getByLabelText('PrePayment Conditions:'), { target: { value: 'None' } });

    expect(screen.getByDisplayValue('5.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1.0')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('None')).toBeInTheDocument();
  });

  test('submits loan products and navigates to dashboard', async () => {
    mock.onPost('http://localhost:8084/loan-products/add').reply(200, { product_id: 1 });
    mock.onPatch('http://localhost:8084/loan-products/partial-update/1').reply(200);

    render(
      <MemoryRouter initialEntries={['/add-loan-products/1']}>
        <Routes>
          <Route path='/add-loan-products/:vendorId' element={<AddLoanProducts />} />
        </Routes>
      </MemoryRouter>
    );

    // Select Gold product
    fireEvent.click(screen.getByLabelText('Gold'));
    fireEvent.change(screen.getByLabelText('Interest Rate:'), { target: { value: '5.5' } });
    fireEvent.change(screen.getByLabelText('Processing Fee:'), { target: { value: '1.0' } });
    fireEvent.change(screen.getByLabelText('PrePayment Charges:'), { target: { value: '0.5' } });
    fireEvent.change(screen.getByLabelText('PrePayment Conditions:'), { target: { value: 'None' } });

    fireEvent.click(screen.getByText('Next'));

    // Wait for the form submission
    await waitFor(() => expect(mock.history.post.length).toBe(1));
    await waitFor(() => expect(mock.history.patch.length).toBe(1));

    // Check if the POST request was made with the correct data
    expect(mock.history.post[0].data).toEqual(JSON.stringify({
      product_name: 'Gold',
      product_interest_rate: '5.5',
      product_processing_fee: '1.0',
      product_prepayment_charge: '0.5',
      product_prepayment_conditions: 'None'
    }));

    // Check if the PATCH request was made with the correct data
    expect(mock.history.patch[0].data).toEqual(JSON.stringify({
      vendor_id: '1'
    }));

    // Simulate navigation by checking if the success message is displayed
    await waitFor(() => expect(screen.getByText('Vendor and Loan Products successfully added. Redirecting back to dashboard in 5 seconds.')).toBeInTheDocument());
  });

  test('displays error when submission fails', async () => {
    mock.onPost('http://localhost:8084/loan-products/add').reply(500);

    render(
      <MemoryRouter initialEntries={['/add-loan-products/1']}>
        <Routes>
          <Route path='/add-loan-products/:vendorId' element={<AddLoanProducts />} />
        </Routes>
      </MemoryRouter>
    );

    // Select Gold product
    fireEvent.click(screen.getByLabelText('Gold'));
    fireEvent.change(screen.getByLabelText('Interest Rate:'), { target: { value: '5.5' } });
    fireEvent.change(screen.getByLabelText('Processing Fee:'), { target: { value: '1.0' } });
    fireEvent.change(screen.getByLabelText('PrePayment Charges:'), { target: { value: '0.5' } });
    fireEvent.change(screen.getByLabelText('PrePayment Conditions:'), { target: { value: 'None' } });

    fireEvent.click(screen.getByText('Next'));

    // Wait for the form submission
    await waitFor(() => expect(mock.history.post.length).toBe(1));

    // Check if the error message is displayed
    await waitFor(() => expect(screen.getByText('Error adding loan products')).toBeInTheDocument());
  });
});
