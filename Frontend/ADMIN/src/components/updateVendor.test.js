import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import UpdateVendor from '../components/UpdateVendor';

// Mock the axios instance
const mock = new MockAdapter(axios);

describe('UpdateVendor Component', () => {
  const vendors = [
    { vendor_id: 1, vendor_name: 'Vendor 1' },
    { vendor_id: 2, vendor_name: 'Vendor 2' },
  ];
  const vendorDetails = {
    vendor_name: 'Vendor 1',
    vendor_logo: 'logo1.png',
  };
  const loanProducts = [
    {
      product_id: 1,
      product_name: 'Personal',
      product_interest_rate: '5.5%',
      product_processing_fee: '1%',
      product_prepayment_charge: '2%',
      product_prepayment_conditions: 'No conditions',
    },
    {
      product_id: 2,
      product_name: 'Gold',
      product_interest_rate: '6%',
      product_processing_fee: '1.5%',
      product_prepayment_charge: '2.5%',
      product_prepayment_conditions: 'Some conditions',
    },
  ];

  beforeEach(() => {
    mock.reset();
  });

  test('renders UpdateVendor component and fetches vendor and loan product details', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, loanProducts);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Update Vendor Details')).toBeInTheDocument();
    expect(screen.getByText('Select Vendor:')).toBeInTheDocument();

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Wait for vendor details and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByDisplayValue('Vendor 1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('logo1.png')).toBeInTheDocument();
      expect(screen.getByText('Personal Loan')).toBeInTheDocument();
      expect(screen.getByText('Gold Loan')).toBeInTheDocument();
    });
  });

  test('handles editing vendor details and loan product details', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, loanProducts);
    mock.onPut('http://localhost:8084/vendors/update/1').reply(200);
    mock.onPut('http://localhost:8084/loan-products/update/1').reply(200);
    mock.onPut('http://localhost:8084/loan-products/update/2').reply(200);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Wait for vendor details and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByDisplayValue('Vendor 1')).toBeInTheDocument();
    });

    // Enable and edit vendor name
    fireEvent.click(screen.getByText('Edit', { selector: 'button' }));
    fireEvent.change(screen.getByDisplayValue('Vendor 1'), { target: { value: 'Updated Vendor 1' } });

    // Enable and edit loan product details
    fireEvent.click(screen.getAllByText('Edit', { selector: 'button' })[1]);
    fireEvent.change(screen.getAllByDisplayValue('5.5%')[0], { target: { value: '6.0%' } });

    // Save changes
    fireEvent.click(screen.getByText('Save'));

    // Check if the PUT requests were made
    await waitFor(() => {
      expect(mock.history.put.length).toBe(3);
      expect(mock.history.put[0].data).toEqual(JSON.stringify({ vendor_name: 'Updated Vendor 1', vendor_logo: 'logo1.png' }));
      expect(mock.history.put[1].data).toEqual(JSON.stringify({
        product_interest_rate: '6.0%',
        product_name: 'Personal',
        vendor: { vendor_id: 1 },
      }));
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('Vendor details updated successfully')).toBeInTheDocument();
    });
  });

  test('handles adding a new loan product', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, loanProducts);
    mock.onPost('http://localhost:8084/loan-products/add').reply(200);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, [...loanProducts, {
      product_id: 3,
      product_name: 'Home',
      product_interest_rate: '7%',
      product_processing_fee: '2%',
      product_prepayment_charge: '3%',
      product_prepayment_conditions: 'Some conditions',
    }]);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Wait for vendor details and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Personal Loan')).toBeInTheDocument();
    });

    // Select a new loan product
    fireEvent.change(screen.getByLabelText('Select Product:'), { target: { value: 'Home' } });

    // Fill in new loan product details
    fireEvent.change(screen.getByPlaceholderText('Interest Rate'), { target: { value: '7%' } });
    fireEvent.change(screen.getByPlaceholderText('Processing Fees'), { target: { value: '2%' } });
    fireEvent.change(screen.getByPlaceholderText('Prepayment Charges'), { target: { value: '3%' } });
    fireEvent.change(screen.getByPlaceholderText('Prepayment Conditions'), { target: { value: 'Some conditions' } });

    // Add new loan product
    fireEvent.click(screen.getByText('Add'));

    // Check if the POST request was made
    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].data).toEqual(JSON.stringify({
        product_name: 'Home',
        product_interest_rate: '7%',
        product_processing_fee: '2%',
        product_prepayment_charge: '3%',
        product_prepayment_conditions: 'Some conditions',
        vendor: { vendor_id: 1 },
      }));
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('Home Loan Product added successfully')).toBeInTheDocument();
    });

    // Check if the new loan product is displayed
    await waitFor(() => {
      expect(screen.getByText('Home Loan')).toBeInTheDocument();
    });
  });

  test('handles deleting a loan product', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, loanProducts);
    mock.onDelete('http://localhost:8084/loan-products/delete/1').reply(200);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Wait for vendor details and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Personal Loan')).toBeInTheDocument();
    });

    // Delete a loan product
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Check if the DELETE request was made
    await waitFor(() => {
      expect(mock.history.delete.length).toBe(1);
      expect(mock.history.delete[0].url).toBe('http://localhost:8084/loan-products/delete/1');
    });

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('Loan product deleted successfully')).toBeInTheDocument();
    });
  });

  test('displays "No vendors available" when there are no vendors', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, []);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Check if the "No vendors available" message is displayed
    await waitFor(() => {
      expect(screen.getByText('No vendors available')).toBeInTheDocument();
    });
  });

  test('displays "No loan products available" when there are no loan products', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, []);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Check if the "No loan products available" message is displayed
    await waitFor(() => {
      expect(screen.getByText('No loan products available')).toBeInTheDocument();
    });
  });

  test('displays error message when fetching vendors fails', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(500);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching vendors')).toBeInTheDocument();
    });
  });

  test('displays error message when fetching vendor details fails', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(500);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching vendor details')).toBeInTheDocument();
    });
  });

  test('displays error message when fetching loan products fails', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(500);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching loan products')).toBeInTheDocument();
    });
  });

  test('displays error message when updating vendor details fails', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, loanProducts);
    mock.onPut('http://localhost:8084/vendors/update/1').reply(500);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Wait for vendor details and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByDisplayValue('Vendor 1')).toBeInTheDocument();
    });

    // Enable and edit vendor name
    fireEvent.click(screen.getByText('Edit', { selector: 'button' }));
    fireEvent.change(screen.getByDisplayValue('Vendor 1'), { target: { value: 'Updated Vendor 1' } });

    // Save changes
    fireEvent.click(screen.getByText('Save'));

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error updating vendor details')).toBeInTheDocument();
    });
  });

  test('displays error message when updating loan product details fails', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, loanProducts);
    mock.onPut('http://localhost:8084/loan-products/update/1').reply(500);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Wait for vendor details and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByDisplayValue('Vendor 1')).toBeInTheDocument();
    });

    // Enable and edit loan product details
    fireEvent.click(screen.getAllByText('Edit', { selector: 'button' })[1]);
    fireEvent.change(screen.getAllByDisplayValue('5.5%')[0], { target: { value: '6.0%' } });

    // Save changes
    fireEvent.click(screen.getByText('Save'));

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error updating loan product details')).toBeInTheDocument();
    });
  });

  test('displays error message when adding new loan product fails', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, loanProducts);
    mock.onPost('http://localhost:8084/loan-products/add').reply(500);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Wait for vendor details and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Personal Loan')).toBeInTheDocument();
    });

    // Select a new loan product
    fireEvent.change(screen.getByLabelText('Select Product:'), { target: { value: 'Home' } });

    // Fill in new loan product details
    fireEvent.change(screen.getByPlaceholderText('Interest Rate'), { target: { value: '7%' } });
    fireEvent.change(screen.getByPlaceholderText('Processing Fees'), { target: { value: '2%' } });
    fireEvent.change(screen.getByPlaceholderText('Prepayment Charges'), { target: { value: '3%' } });
    fireEvent.change(screen.getByPlaceholderText('Prepayment Conditions'), { target: { value: 'Some conditions' } });

    // Add new loan product
    fireEvent.click(screen.getByText('Add'));

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error adding loan product')).toBeInTheDocument();
    });
  });

  test('displays error message when deleting loan product fails', async () => {
    mock.onGet('http://localhost:8084/vendors/read').reply(200, vendors);
    mock.onGet('http://localhost:8084/vendors/readOne/1').reply(200, vendorDetails);
    mock.onGet('http://localhost:8084/loan-products/vendor/1').reply(200, loanProducts);
    mock.onDelete('http://localhost:8084/loan-products/delete/1').reply(500);

    render(
      <BrowserRouter>
        <UpdateVendor />
      </BrowserRouter>
    );

    // Select a vendor
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

    // Wait for vendor details and loan products to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Personal Loan')).toBeInTheDocument();
    });

    // Delete a loan product
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Error deleting loan product')).toBeInTheDocument();
    });
  });
});
