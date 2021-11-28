import React, { ChangeEvent, useState } from "react";
import { PlainClientAPI } from "contentful-management";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@contentful/forma-36-react-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";

const initialTableState = [[""]];

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}

const Field = ({ sdk }: FieldProps) => {
  const [table, setTable] = useState<string[][]>(
    sdk.field.getValue() || initialTableState
  );

  const [headRow, ...otherRows] = table;

  async function handleCellBlur(
    event: ChangeEvent<HTMLTableCellElement>,
    rowIndex: number,
    cellIndex: number
  ) {
    const { innerText } = event.target;
    const newTable = [...table];
    newTable[rowIndex][cellIndex] = innerText;

    setTable(newTable);

    await sdk.field.setValue(newTable);
    await sdk.entry.save();
  }

  async function addRow() {
    const cellsCount = table[0].length;
    const newTable = [...table, Array.from({ length: cellsCount }, () => "")];

    setTable(newTable);

    await sdk.field.setValue(newTable);
    await sdk.entry.save();
  }

  async function removeRow() {
    let newTable;

    if (table.length === 1) {
      newTable = initialTableState;
    } else {
      newTable = table.slice(0, -1);
    }

    setTable(newTable);

    await sdk.field.setValue(newTable);
    await sdk.entry.save();
  }

  return (
    <>
      <Button onClick={addRow}>Add row</Button>
      <Button onClick={removeRow}>Remove row</Button>
      <Table>
        <TableHead>
          <TableRow>
            {headRow?.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                onBlur={(event) => handleCellBlur(event, 0, cellIndex)}
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
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell
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
};

export default Field;
