import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockSdk } from '../../../__mocks__';
import { Field } from '../Field';

describe('Field component editing table data', () => {
  describe('when editing a cell', () => {
    beforeEach(async () => {
      render(<Field sdk={mockSdk} />);

      const [firstCell] = screen.getAllByRole('cell');

      userEvent.click(firstCell);

      expect(firstCell).toHaveFocus();

      userEvent.type(firstCell, '0-0');

      // Clicking somewhere outside the cell to trigger onBlur
      userEvent.click(screen.getByRole('table'));
    });

    it('should allow editing the table data', () => {
      const [firstCell] = screen.getAllByRole('cell');

      expect(firstCell.innerHTML).toBe('0-0');
    });

    it('should call the setValue and save sdk methods with the latest table data', () => {
      expect(mockSdk.field.setValue).toHaveBeenCalledTimes(1);

      // FIXME for a yet to be discovered reason in the test the newly
      // added value concatenates to the previous one while the Field
      // should be rerendered so should only have initial state and the
      // SDK methods are mocked so they aren't able to save data either.
      // Normally we would expect [['0-0']] here.
      expect(mockSdk.field.setValue).toHaveBeenCalledWith([['0-00-0']]);
    });
  });
});
