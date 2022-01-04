import React from 'react-dom';
import { render, screen } from '@testing-library/react';
import { LocalhostWarning } from '../LocalhostWarning';

describe('LocalhostWarning', () => {
  it('should render a note telling the user the App is running outside of Contentful', () => {
    render(<LocalhostWarning />);

    expect(screen.getByText('App running outside of Contentful')).toBeVisible();
  });
});
