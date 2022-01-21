import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// @ts-ignore
import decodeHtml from 'decode-html';
import { mockSdk } from '../../../__mocks__';
import { Field } from '../Field';

describe('Field component editing table data', () => {
  beforeAll(() => {
    // Mock Element.innerText. For more info see:
    // https://github.com/jsdom/jsdom/issues/1245#issuecomment-470192636
    Object.defineProperty(global.Element.prototype, 'innerText', {
      get() {
        const decodedHtml = decodeHtml(this.textContent);
        return decodedHtml;
      },
      configurable: true,
    });
  });
  describe('when editing a cell in the table head', () => {
    beforeEach(() => {
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
  describe('when editing a cell in the table body', () => {
    const initialTableData = [['0-0'], ['']];

    beforeEach(() => {
      // Render the table with two rows initially so we can test
      // a cell in the body of the table
      mockSdk.field.getValue.mockReturnValueOnce(initialTableData);

      render(<Field sdk={mockSdk} />);

      const secondRowCell = screen.getAllByRole('cell')[1];

      userEvent.click(secondRowCell);

      expect(secondRowCell).toHaveFocus();

      userEvent.type(secondRowCell, '1-0');

      // Clicking somewhere outside the cell to trigger onBlur
      userEvent.click(screen.getByRole('table'));
    });

    it('should allow editing the table data', () => {
      const secondRowCell = screen.getAllByRole('cell')[1];

      expect(secondRowCell.innerHTML).toBe('1-0');
    });

    it('should call the setValue and save sdk methods with the latest table data', () => {
      expect(mockSdk.field.setValue).toHaveBeenCalledTimes(1);

      // FIXME for a yet to be discovered reason in the test the newly
      // added value concatenates to the previous one while the Field
      // should be rerendered so should only have initial state and the
      // SDK methods are mocked so they aren't able to save data either.
      // Normally we would expect [['0-0'], ['1-0']] here.
      expect(mockSdk.field.setValue).toHaveBeenCalledWith([
        ['0-0'],
        ['1-01-0'],
      ]);
    });
  });

  /**
   * The mock of Element.innerText completely defeats the purpose of
   * this test :). But the mock is the only way to test code using
   * Element.innerText as far as I know since jsdom doesn't implement
   * it (see: https://github.com/jsdom/jsdom/issues/1245).
   *
   * This should fail when the cellBlur handler would use innerHtml
   * instead of innerText (which would cause the bug this test is
   * written for). Unfortunately it won't :). Leaving
   * it here in the hope I or somebody else someday has an epiphany
   * that could make this actually valuable.
   */

  // src: https://en.wikipedia.org/wiki/Character_encodings_in_HTML
  describe('when entering special characters "outside of the range of 7 bit ASCII"', () => {
    beforeEach(() => {
      render(<Field sdk={mockSdk} />);

      const [firstCell] = screen.getAllByRole('cell');

      userEvent.click(firstCell);

      expect(firstCell).toHaveFocus();

      userEvent.type(firstCell, '>');

      // Clicking somewhere outside the cell to trigger onBlur
      userEvent.click(screen.getByRole('table'));
    });

    describe('>', () => {
      it('should not html-encode the entered characters', () => {
        const [firstCell] = screen.getAllByRole('cell');

        /**
         * Seems to be the first describe of this test suite
         * somehow causes the leaking which for which also here
         * I'm testing for 0-00-0> instead of just >
         */
        expect(firstCell.innerText).toBe('0-00-0>');
      });
    });
  });
});
