import { Produto } from '@prisma/client'
import { create } from 'zustand'

type StockType = {
  editarProdutoItem: Produto | null
  produtos: Produto[] | []
  busca: 'Código' | 'Descricão'
  buscarDescricao: (requisito: string) => Promise<void>
  buscarCodigo: (requisito: string) => Promise<void>
  mudarBusca: (busca: 'Código' | 'Descricão') => void
  editarProduto: (produto: Produto | null) => void
}

async function fetchPrismaStockCode(requisito: string): Promise<Produto[]> {
  try {
    const produtos = await window.api.prisma.produto.findMany({
      where: {
        codigoOriginal: {
          contains: requisito,
        },
      },
    })
    return produtos
  } catch (error) {
    console.log(error)
    return []
  }
}
async function fetchPrismaStockDescription(requisito: string): Promise<Produto[]> {
  try {
    const produtos = await window.api.prisma.produto.findMany({
      where: {
        descricao: {
          contains: requisito,
        },
      },
    })
    return produtos
  } catch (error) {
    console.log(error)
    return []
  }
}

export const useStockStore = create<StockType>((set) => ({
  editarProdutoItem: null,
  produtos: [],
  busca: 'Código',
  buscarDescricao: async (requisito): Promise<void> => {
    const produtos = await fetchPrismaStockDescription(requisito.toLocaleLowerCase())
    set({ produtos: produtos })
  },
  buscarCodigo: async (requisito): Promise<void> => {
    const produtos = await fetchPrismaStockCode(requisito.toLocaleLowerCase())
    set({ produtos: produtos })
  },
  mudarBusca: (busca: 'Código' | 'Descricão'): void => set(() => ({ busca: busca })),
  editarProduto: (produto: Produto | null): void => {
    set(() => ({ editarProdutoItem: produto }))
  },
}))
