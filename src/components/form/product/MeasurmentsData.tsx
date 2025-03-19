import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function MeasurementsData() {
  const form = useFormContext();

  return (
    <>
      <h3 className="text-lg font-semibold">Medidas</h3>
      <div className="gap-4 grid md:grid-cols-2">
        {[
          { name: 'width', label: 'Largura (cm)' },
          { name: 'height', label: 'Altura (cm)' },
          {
            name: 'length',
            label: 'Comprimento (cm)',
          },
          { name: 'weight', label: 'Peso (kg)' },
        ].map(({ name, label }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </>
  );
}
