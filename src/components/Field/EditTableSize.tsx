import React from 'react';
import { IconButton, Text, Flex } from '@contentful/f36-components';
import { MinusIcon, PlusIcon } from '@contentful/f36-icons';

const initialTableState = [['']];

type TAddRemoveControlsProps = {
  label: string;
  onAdd: () => void;
  onRemove: () => void;
};

function AddRemoveControls({
  label,
  onAdd,
  onRemove,
}: TAddRemoveControlsProps) {
  return (
    <Flex alignItems="center" margin="spacingS">
      <Text
        fontSize="fontSizeS"
        lineHeight="lineHeightS"
        style={{ marginRight: '0.5rem' }}
      >
        {label}
      </Text>
      <IconButton
        aria-label={`remove ${label.toLowerCase()}`}
        icon={<MinusIcon />}
        onClick={onRemove}
        size="small"
        variant="transparent"
      />
      <IconButton
        aria-label={`add ${label.toLowerCase()}`}
        icon={<PlusIcon />}
        onClick={onAdd}
        size="small"
      />
    </Flex>
  );
}

type TEditTableSizeProps = {
  table: string[][];
  saveTable: (newTable: string[][]) => void;
};

export function EditTableSize({ table, saveTable }: TEditTableSizeProps) {
  async function addRow() {
    const cellsCount = table[0].length;
    const newTable = [...table, Array.from({ length: cellsCount }, () => '')];

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
    const newTable = table.map((row) => [...row, '']);

    saveTable(newTable);
  }

  async function removeCell() {
    const newTable = table.map((row) => {
      if (row.length === 1) {
        return [''];
      }

      return row.slice(0, -1);
    });

    saveTable(newTable);
  }

  return (
    <Flex justifyContent="space-between">
      <AddRemoveControls label="Rows" onAdd={addRow} onRemove={removeRow} />
      <AddRemoveControls label="Cells" onAdd={addCell} onRemove={removeCell} />
    </Flex>
  );
}
