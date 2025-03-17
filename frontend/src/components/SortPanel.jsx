import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortPanel = ({ onSortChange, onItemsPerRowChange }) => {
  const sortOptions = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'priceAsc', label: 'По цене (по возрастанию)' },
    { value: 'priceDesc', label: 'По цене (по убыванию)' },
    { value: 'rating', label: 'По рейтингу' },
  ];

  const itemsPerRowOptions = [
    { value: 1, label: '1 элемент в строку' },
    { value: 2, label: '2 элемента в строку' },
    { value: 3, label: '3 элемента в строку' },
  ];

  return (
    <>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Сортировка</InputLabel>
        <Select
          label="Сортировка"
          onChange={(e) => onSortChange(e.target.value)}
          defaultValue="default"
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Количество элементов в строку</InputLabel>
        <Select
          label="Количество элементов в строку"
          onChange={(e) => onItemsPerRowChange(e.target.value)}
          defaultValue={2}
        >
          {itemsPerRowOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SortPanel;