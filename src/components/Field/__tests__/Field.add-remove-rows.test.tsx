import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '../Field';
import { mockSdk } from '../../../../test/mocks';

describe('Field component adding and removing rows', () => {
  describe('when clicking add row button', () => {
    beforeEach(() => {
      render(<Field sdk={mockSdk as any} />);

      const addRowButton = screen.getByText('add rows');

      userEvent.click(addRowButton);
    });

    it('adds a row to the table', () => {
      const tableRows = screen.getAllByRole('row');

      expect(tableRows.length).toBe(2);
    });
  });

  describe('when clicking remove row button', () => {
    beforeEach(() => {
      render(<Field sdk={mockSdk as any} />);

      const removeRowButton = screen.getByText('remove rows');

      userEvent.click(removeRowButton);
    });

    it('should still render one row with one empty cell by default', () => {
      const tableRows = screen.getAllByRole('row');
      const tableCells = screen.getAllByRole('cell');
      const [tableCell] = tableCells;

      expect(tableRows.length).toBe(1);
      expect(tableCells.length).toBe(1);
      expect(tableCell.innerHTML).toBe('');
    });
  });

  describe('when there is table data initially', () => {
    const initialTableData = [
      ['0-0', '0-1', '0-2'],
      ['1-0', '1-1', '1-2'],
      ['2-0', '2-1', '2-2'],
    ];

    beforeEach(() => {
      mockSdk.field.getValue.mockReturnValueOnce(initialTableData);
    });

    describe('when clicking remove row button', () => {
      beforeEach(() => {
        render(<Field sdk={mockSdk as any} />);

        const removeRowButton = screen.getByText('remove rows');

        userEvent.click(removeRowButton);
      });

      it('removes a row from the table', () => {
        const tableRows = screen.getAllByRole('row');

        expect(tableRows.length).toBe(2);
      });

      it('should remove the last row from the table', () => {
        const tableRows = screen.getAllByRole('row');

        // Assert that the first two rows of the table are still in
        // the document.
        tableRows.forEach((tableRow, rowIndex) => {
          const cells = within(tableRow).getAllByRole('cell');

          cells.forEach((cell, cellIndex) =>
            expect(cell.innerHTML).toBe(initialTableData[rowIndex][cellIndex])
          );
        });

        // Assert that the data of the last row is not in the document.
        initialTableData[2].forEach((cell) =>
          expect(screen.queryByText(cell)).not.toBeInTheDocument()
        );
      });
    });

    describe('when clicking add row button', () => {
      beforeEach(() => {
        render(<Field sdk={mockSdk as any} />);

        const addRowButton = screen.getByText('add rows');

        userEvent.click(addRowButton);
      });

      it('adds a row to the table', () => {
        const tableRows = screen.getAllByRole('row');

        expect(tableRows.length).toBe(4);
      });

      it('should render the new row with empty cells', () => {
        const lastRow = screen.getAllByRole('row')[initialTableData.length];
        const lastRowCells = within(lastRow).getAllByRole('cell');

        lastRowCells.forEach((tableCell) =>
          expect(tableCell.innerHTML).toBe('')
        );
      });
    });
  });
});
