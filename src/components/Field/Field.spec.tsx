import React from 'react';
import { render, screen } from '@testing-library/react';
import { Field } from './Field';
import { mockSdk } from '../../../test/mocks';

describe('Field component', () => {
  it('Component text exists', () => {
    render(<Field sdk={mockSdk} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
