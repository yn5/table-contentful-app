import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '../Field';
import { mockSdk } from '../../../../test/mocks';

describe('Field component adding and removing cells', () => {
  describe('when clicking add cell button', () => {
    beforeEach(() => {
      render(<Field sdk={mockSdk as any} />);

      const addCellButton = screen.getByText('add cells');

      userEvent.click(addCellButton);
    });

    it('adds a cell to all the rows in the table', () => {
      const tableRows = screen.getAllByRole('row');

      tableRows.forEach((tableRow) => {
        expect(within(tableRow).getAllByRole('cell').length).toBe(2);
      });
    });

    it('should render the newly added row with empty cells', () => {
      const tableRows = screen.getAllByRole('row');

      tableRows.forEach((tableRow) => {
        const tableCells = within(tableRow).getAllByRole('cell');

        tableCells.forEach((tableCell) => {
          expect(tableCell.innerHTML).toBe('');
        });
      });
    });
  });

  describe('when clicking remove cell button', () => {
    beforeEach(() => {
      render(<Field sdk={mockSdk as any} />);

      const removeCellButton = screen.getByText('remove cells');

      userEvent.click(removeCellButton);
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

    describe('when clicking add cell button', () => {
      beforeEach(() => {
        render(<Field sdk={mockSdk as any} />);

        const addCellButton = screen.getByText('add cells');

        userEvent.click(addCellButton);
      });

      it('adds a cell to every row in the table', () => {
        const tableRows = screen.getAllByRole('row');

        tableRows.forEach((tableRow) => {
          expect(within(tableRow).getAllByRole('cell').length).toBe(4);
        });
      });

      it('should render the newly added row with empty cells', () => {
        const tableRows = screen.getAllByRole('row');

        tableRows.forEach((tableRow) => {
          const tableRowCells = within(tableRow).getAllByRole('cell');
          expect(tableRowCells[tableRowCells.length - 1].innerHTML).toBe('');
        });
      });
    });

    describe('when clicking remove cell button', () => {
      beforeEach(() => {
        render(<Field sdk={mockSdk as any} />);

        const removeCellButton = screen.getByText('remove cells');

        userEvent.click(removeCellButton);
      });

      it('removes a cell from every row in the table', () => {
        const tableRows = screen.getAllByRole('row');

        tableRows.forEach((tableRow) => {
          expect(within(tableRow).getAllByRole('cell').length).toBe(2);
        });
      });

      it('should remove the last cell from the table', () => {
        const tableRows = screen.getAllByRole('row');

        // Assert that the first two cells of the table are still in
        // the document.
        initialTableData.forEach((initialRow, rowIndex) => {
          const tableCells = within(tableRows[rowIndex]).getAllByRole('cell');
          const initialFirstTwoCells = initialRow.slice(0, -1);

          initialFirstTwoCells.forEach((initialCell, cellIndex) => {
            expect(tableCells[cellIndex].innerHTML).toBe(initialCell);
          });
        });

        // Assert that the data of the last row is not in the document.
        initialTableData.forEach((initialRow) =>
          expect(screen.queryByText(initialRow[2])).not.toBeInTheDocument()
        );
      });
    });
  });
});
