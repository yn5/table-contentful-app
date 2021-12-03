import React from "react";
import {
  IconButton,
  Paragraph,
  Flex,
} from "@contentful/forma-36-react-components";

const initialTableState = [[""]];

type TAddRemoveControlsProps = {
  label: string;
  onAdd: () => void;
  onRemove: () => void;
};

const AddRemoveControls = ({
  label,
  onAdd,
  onRemove,
}: TAddRemoveControlsProps) => {
  return (
    <>
      <Paragraph style={{ marginRight: "0.5rem" }}>{label}</Paragraph>
      <IconButton iconProps={{ icon: "Minus" }} onClick={onRemove} />
      <IconButton iconProps={{ icon: "Plus" }} onClick={onAdd} />
    </>
  );
};

type TEditTableSizeProps = {
  table: string[][];
  saveTable: (newTable: string[][]) => void;
};

export const EditTableSize = ({ table, saveTable }: TEditTableSizeProps) => {
  async function addRow() {
    const cellsCount = table[0].length;
    const newTable = [...table, Array.from({ length: cellsCount }, () => "")];

    saveTable(newTable);
  }

  async function removeRow() {
    let newTable;

    if (table.length === 1) {
      newTable = initialTableState;
    } else {
      newTable = table.slice(0, -1);
    }

    saveTable(newTable);
  }

  async function addCell() {
    const newTable = table.map((row) => [...row, ""]);

    saveTable(newTable);
  }

  async function removeCell() {
    const newTable = table.map((row) => {
      if (row.length === 1) {
        return [""];
      }

      return row.slice(0, -1);
    });

    saveTable(newTable);
  }

  return (
    <Flex justifyContent="space-between">
      <Flex margin="spacingS">
        <AddRemoveControls label="Rows" onAdd={addRow} onRemove={removeRow} />
      </Flex>
      <Flex margin="spacingS">
        <AddRemoveControls
          label="Cells"
          onAdd={addCell}
          onRemove={removeCell}
        />
      </Flex>
    </Flex>
  );
};
