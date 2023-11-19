export function DbToFront(money: number): string {
  //.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  return (money / 100).toLocaleString('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
  })
}

export function FrontToDb(money: string | number): number {
  const convert = typeof money === 'string' ? parseFloat(money) : money

  return Math.round(convert * 100)
}
