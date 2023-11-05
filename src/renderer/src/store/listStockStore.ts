import { ProdutoDTO } from '@renderer/dto/produto.dto'
import { create } from 'zustand'

type ListStockType = {
  produtos: ProdutoDTO[]
  buscarDescricao: (descricao: string) => void
}

const mock: ProdutoDTO[] = [
  {
    id: 1,
    descricao: 'teste',
    codigoOriginal: 'teste',
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
    codigoOriginal: 'produto',
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
    codigoOriginal: 'produto',
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
  buscarDescricao: (descricao: string): void =>
    set(() => ({
      produtos:
        descricao == '' ? [] : mock.filter((p) => p.descricao && p.descricao.includes(descricao)),
    })),
}))
