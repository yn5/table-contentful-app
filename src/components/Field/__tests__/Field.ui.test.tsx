import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Field } from '../Field';
import { mockSdk } from '../../../__mocks__';

describe('Field component UI', () => {
  it('shows a table', () => {
    render(<Field sdk={mockSdk} />);

    expect(screen.getByRole('table')).toBeVisible();
  });

  it('should render one row with one empty cell by default', () => {
    render(<Field sdk={mockSdk} />);

    const tableRows = screen.getAllByRole('row');
    const tableCells = screen.getAllByRole('cell');
    const [tableCell] = tableCells;

    expect(tableRows.length).toBe(1);
    expect(tableCells.length).toBe(1);
    expect(tableCell.innerHTML).toBe('');
  });

  it("should start the sdk's autoresizer after mount", () => {
    render(<Field sdk={mockSdk} />);

    expect(mockSdk.window.startAutoResizer.mock.calls.length).toBe(1);
  });

  it("should not start the sdk's autoresizer on a rerender of the component", () => {
    render(<Field sdk={mockSdk} />);

    // Cause a rerender by adding a row
    const addRowButton = screen.getByLabelText('add rows');
    userEvent.click(addRowButton);

    expect(mockSdk.window.startAutoResizer.mock.calls.length).toBe(1);
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

    it('should render all rows and cells with the correct data', () => {
      render(<Field sdk={mockSdk} />);

      const tableRows = screen.getAllByRole('row');
      const tableCells = screen.getAllByRole('cell');

      expect(tableRows.length).toBe(3);
      expect(tableCells.length).toBe(9);

      const flatInitialTableData = initialTableData.flatMap((c) => c);

      tableCells.forEach((tableCell, index) =>
        expect(tableCell.innerHTML).toBe(flatInitialTableData[index])
      );
    });
  });
});
