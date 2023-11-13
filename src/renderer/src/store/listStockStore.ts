import { ProdutoDTO } from '@renderer/dto/produto.dto'
import { create } from 'zustand'

type ListStockType = {
  produtos: ProdutoDTO[]
  busca: 'Código' | 'Descricão'
  buscarProduto: (chamada: string) => void
  mudarBusca: (busca: 'Código' | 'Descricão') => void
}

const mock: ProdutoDTO[] = [
  {
    id: 1,
    descricao: 'teste',
    codigoOriginal: 'teste1',
    marca: 'teste',
    precoVenda: 1,
    precoCusto: 1,
    tamanho: 'teste',
    cor: 'teste',
    local: 'teste',
    estoque: 1,
  },
  {
    id: 2,
    descricao: 'produto',
    codigoOriginal: 'produto2',
    marca: 'produto',
    precoVenda: 1,
    precoCusto: 1,
    tamanho: 'produto',
    cor: 'produto',
    local: 'produto',
    estoque: 1,
  },
  {
    id: 3,
    descricao: 'produto 2',
    codigoOriginal: 'produto3',
    marca: 'produto',
    precoVenda: 1,
    precoCusto: 1,
    tamanho: 'produto',
    cor: 'produto',
    local: 'produto',
    estoque: 1,
  },
]

export const useListStock = create<ListStockType>((set) => ({
  produtos: [],
  busca: 'Código',
  buscarProduto: (chamada: string): void => {
    set((state) => {
      return {
        ...state,
        produtos:
          chamada === ''
            ? []
            : state.busca === 'Código'
            ? mock.filter((p) => p.codigoOriginal?.includes(chamada.toLocaleLowerCase()))
            : mock.filter((p) => p.descricao?.includes(chamada.toLocaleLowerCase())),
      }
    })
  },
  mudarBusca: (busca: 'Código' | 'Descricão'): void => set(() => ({ busca: busca })),
}))
