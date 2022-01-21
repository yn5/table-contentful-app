import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { EditTableSize } from './EditTableSize';

const initialTableState = [['']];

type FieldProps = {
  sdk: FieldExtensionSDK;
};

export function Field({ sdk }: FieldProps) {
  const [table, setTable] = useState<string[][]>(
    sdk.field.getValue() || initialTableState
  );

  const [headRow, ...otherRows] = table;

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk.window]);

  async function saveTable(newTable: string[][]) {
    setTable(newTable);

    await sdk.field.setValue(newTable);
    await sdk.entry.save();
  }

  async function handleCellBlur(
    event: ChangeEvent<HTMLTableCellElement>,
    rowIndex: number,
    cellIndex: number
  ) {
    const { innerText } = event.target;

    const newTable = [...table];
    newTable[rowIndex][cellIndex] = innerText;

    saveTable(newTable);
  }

  return (
    <>
      <EditTableSize table={table} saveTable={saveTable} />
      <Table>
        <TableHead>
          <TableRow>
            {headRow?.map((cell, cellIndex) => (
              <TableCell
                // eslint-disable-next-line react/no-array-index-key
                key={cellIndex}
                onBlur={(event) => handleCellBlur(event, 0, cellIndex)}
                role="cell"
                contentEditable
                suppressContentEditableWarning
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {otherRows?.map((row, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell
                  // eslint-disable-next-line react/no-array-index-key
                  key={cellIndex}
                  onBlur={(event) =>
                    handleCellBlur(event, rowIndex + 1, cellIndex)
                  }
                  contentEditable
                  suppressContentEditableWarning
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
