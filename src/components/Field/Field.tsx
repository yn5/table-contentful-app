import React, { ChangeEvent, useState } from "react";
import { PlainClientAPI } from "contentful-management";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@contentful/forma-36-react-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { EditTableSize } from "./EditTableSize";

const initialTableState = [[""]];

type FieldProps = {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
};

const Field = ({ sdk }: FieldProps) => {
  const [table, setTable] = useState<string[][]>(
    sdk.field.getValue() || initialTableState
  );

  const [headRow, ...otherRows] = table;

  async function saveTable(table: string[][]) {
    setTable(table);

    await sdk.field.setValue(table);
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
      <Table playsInline>
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