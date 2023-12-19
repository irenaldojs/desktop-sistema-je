import { Fornecedor, Produto } from '@prisma/client'
import { create } from 'zustand'

export type ProdutoItemType = {
  produto: Produto
  quantidade: number
}

export type EntradaState = {
  fornecedor: Fornecedor | null
  produtos: ProdutoItemType[]
  setFornecedor: (fornecedores: Fornecedor) => void
  AddProdutoEntry: (produto: ProdutoItemType) => void
}

export const useEntryStore = create<EntradaState>((set) => ({
  fornecedor: null,
  produtos: [],
  setFornecedor: (fornecedor): void => set({ fornecedor }),

  AddProdutoEntry: (produto): void => {
    set((state) => ({
      produtos: [...state.produtos, produto],
    }))
  },
}))
