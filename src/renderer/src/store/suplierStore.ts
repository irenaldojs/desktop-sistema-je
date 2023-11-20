import { Fornecedor } from '@prisma/client'
import { create } from 'zustand'

type SuplierType = {
  fornecedores: Fornecedor[] | []
  buscarFornecedor: (requisito: string) => Promise<void>
}

async function fetchPrismaSuplier(requisito: string): Promise<Fornecedor[]> {
  try {
    const fornecedores: Fornecedor[] = await window.api.prisma.fornecedor.findMany({
      where: {
        OR: [
          {
            nome: {
              contains: requisito,
            },
          },
          {
            telefone: {
              contains: requisito,
            },
          },
        ],
      },
    })
    return fornecedores
  } catch (error) {
    console.log(error)
    return []
  }
}

export const useSuplierStore = create<SuplierType>((set) => ({
  fornecedores: [],
  buscarFornecedor: async (requisito): Promise<void> => {
    if (!requisito || requisito === '') {
      set({ fornecedores: [] })
    } else {
      const fornecedores = await fetchPrismaSuplier(requisito.toLocaleLowerCase())
      set({ fornecedores })
    }
  },
}))
