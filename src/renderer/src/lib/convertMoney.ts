export function DbToFront(money: number): string {
  return (money / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function FrontToDb(money: string | number): number {
  const convert = typeof money === 'string' ? parseFloat(money) : money

  return Math.round(convert * 100)
}
