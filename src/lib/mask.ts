export const mask = {
  // CEP: 00000-000
  cep: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9); // Limita o tamanho total para 9 caracteres
  },

  // Cartão: 0000 0000 0000 0000
  creditCard: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  },

  // Data: MM/AA
  expiryDate: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 5); // Limita a data ao formato MM/AA
  },

  // CVV: 000
  cvv: (value: string) => {
    return value.replace(/\D/g, '').slice(0, 3); // Limita a 3 dígitos
  },

  // CPF: 000.000.000-00
  cpf: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14); // Limita o tamanho ao CPF
  },

  // Telefone: (00) 00000-0000
  phone: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15); // Limita o tamanho ao formato (00) 00000-0000
  },

  // Dinheiro (R$ 1.234,56)
  money: (value: string | number): string => {
    if (!value) return 'R$ 0,00';

    // Remover tudo que não for número e manter a lógica decimal
    const numericValue =
      typeof value === 'string' ? value.replace(/[^0-9]/g, '') : String(value);

    // Transformar em número e dividir por 100 para representar centavos corretamente
    const formattedValue = (Number(numericValue) / 100).toFixed(2);

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(formattedValue));
  },

  decimal: (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{1,})(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.');
  },

  numeric: (value: string) => {
    return value.replace(/\D/g, '');
  },

  // Conversão do decimal para envio ao servidor
  decimalToNumber: (value: string): number => {
    return parseFloat(value.replace(',', '.')) || 0;
  },
};
