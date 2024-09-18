// components/ProtectedRoute.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Mock components for testing
const MockComponent = () => <div>Mock Component</div>;
const HomeComponent = () => <div>Home</div>;

describe('ProtectedRoute Component', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('renders component when user is authenticated', () => {
    localStorage.setItem('user_id', '1');

    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/protected" element={<ProtectedRoute element={MockComponent} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Mock Component')).toBeInTheDocument();
  });

  test('redirects to home when user is not authenticated', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/protected" element={<ProtectedRoute element={MockComponent} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Home')).toBeInTheDocument();
  });
});
