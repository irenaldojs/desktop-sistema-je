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
  AddProduto: (produto: ProdutoItemType) => void
}

export const useEntryStore = create<EntradaState>((set) => ({
  fornecedor: null,
  produtos: [],
  setFornecedor: (fornecedor): void => set({ fornecedor }),

  AddProduto: (produto): void =>
    set({ produtos: [...useEntryStore.getState().produtos, { ...produto }] }),
}))
