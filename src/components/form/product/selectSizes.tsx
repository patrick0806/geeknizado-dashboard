'use client';

import { useState } from 'react';

import { MultiSelect } from '@/components/ui/multi-select';

const productSizes = [
  { value: 'PP', label: 'PP' },
  { value: 'P', label: 'P' },
  { value: 'M', label: 'M' },
  { value: 'G', label: 'G' },
  { value: 'GG', label: 'GG' },
];

export function SelectSizes() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  return (
    <MultiSelect
      options={productSizes}
      onValueChange={setSelectedSizes}
      defaultValue={selectedSizes}
      placeholder="Selecione os tamanhos"
      variant="inverted"
      animation={2}
      maxCount={5}
    />
  );
}
