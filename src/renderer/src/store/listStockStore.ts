import { Produto } from '@prisma/client'
import { prisma } from '@renderer/lib/prisma'
import { create } from 'zustand'

type ListStockType = {
  produtos: Produto[] | []
  busca: 'Código' | 'Descricão'
  buscarDescricao: (requisito: string) => Promise<void>
  buscarCodigo: (requisito: string) => Promise<void>
  mudarBusca: (busca: 'Código' | 'Descricão') => void
}

async function fetchPrismaStockCode(requisito: string): Promise<Produto[]> {
  console.log(requisito)

  try {
    const produtos = await prisma.produto.findMany({
      where: {
        OR: [
          {
            codigoOriginal: {
              contains: requisito,
            },
          },
          {
            descricao: {
              contains: requisito,
            },
          },
        ],
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
    const produtos = await prisma.produto.findMany({
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

export const useListStock = create<ListStockType>((set) => ({
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
}))
