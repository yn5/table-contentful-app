import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '../Field';
import { mockSdk } from '../../../__mocks__';

function expectRowsCountToBe(count: number) {
  const tableRows = screen.getAllByRole('row');

  expect(tableRows.length).toBe(count);
}

function expectLastRowToHaveEmptyCells() {
  const tableRows = screen.getAllByRole('row');
  const lastTableRow = tableRows[tableRows.length - 1];
  const lastTableRowCells = within(lastTableRow).getAllByRole('cell');

  lastTableRowCells.forEach((lastTableRowCell) => {
    expect(lastTableRowCell.innerHTML).toBe('');
  });
}

describe('Field component adding and removing rows', () => {
  describe('when clicking add row button', () => {
    beforeEach(() => {
      render(<Field sdk={mockSdk as any} />);

      const addRowButton = screen.getByText('add rows');

      userEvent.click(addRowButton);
    });

    it('adds a row to the table', () => {
      expectRowsCountToBe(2);
    });

    it('should render the newly added row with empty cells', () => {
      expectLastRowToHaveEmptyCells();
    });
  });

  describe('when clicking remove row button', () => {
    beforeEach(() => {
      render(<Field sdk={mockSdk as any} />);

      const removeRowButton = screen.getByText('remove rows');

      userEvent.click(removeRowButton);
    });

    it('should still render one row with one empty cell', () => {
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

    describe('when clicking add row button', () => {
      beforeEach(() => {
        render(<Field sdk={mockSdk as any} />);

        const addRowButton = screen.getByText('add rows');

        userEvent.click(addRowButton);
      });

      it('adds a row to the table', () => {
        expectRowsCountToBe(4);
      });

      it('should render the newly added row with empty cells', () => {
        expectLastRowToHaveEmptyCells();
      });
    });

    describe('when clicking remove row button', () => {
      beforeEach(() => {
        render(<Field sdk={mockSdk as any} />);

        const removeRowButton = screen.getByText('remove rows');

        userEvent.click(removeRowButton);
      });

      it('removes a row from the table', () => {
        expectRowsCountToBe(2);
      });

      it('should remove the last row from the table', () => {
        const tableRows = screen.getAllByRole('row');

        // Assert that the first two cells of the table are still in
        // the document.

        const initialFirstTwoRows = initialTableData.slice(0, -1);
        initialFirstTwoRows.forEach((initialRow, rowIndex) => {
          const tableCells = within(tableRows[rowIndex]).getAllByRole('cell');

          initialRow.forEach((initialCell, cellIndex) => {
            expect(tableCells[cellIndex].innerHTML).toBe(initialCell);
          });
        });

        // Assert that the data of the last row is not in the document.
        initialTableData[2].forEach((initialCell) =>
          expect(screen.queryByText(initialCell)).not.toBeInTheDocument()
        );

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
  });
});
