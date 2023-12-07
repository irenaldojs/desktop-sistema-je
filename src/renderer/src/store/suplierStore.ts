import { Fornecedor } from '@prisma/client'
import { create } from 'zustand'

export type EnderecoType = {
  rua?: string
  numero?: string
  bairro?: string
  cidade?: string
  estado?: string
}

export type FornecedorType = {
  id?: number
  nome: string
  telefone: string
  endereco: EnderecoType
}

type SuplierType = {
  fornecedores: Fornecedor[] | []
  editarFornecedor: FornecedorType | null
  buscarFornecedor: (requisito: string) => Promise<void>
  setEditarFornecedor: (fornecedor: FornecedorType | null) => void
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
  editarFornecedor: null,
  buscarFornecedor: async (requisito): Promise<void> => {
    if (!requisito || requisito === '') {
      set({ fornecedores: [] })
    } else {
      const fornecedores = await fetchPrismaSuplier(requisito.toLocaleLowerCase())
      set({ fornecedores })
    }
  },
  setEditarFornecedor: (fornecedor): void =>
    fornecedor ? set({ editarFornecedor: fornecedor }) : set({ editarFornecedor: null }),
}))
