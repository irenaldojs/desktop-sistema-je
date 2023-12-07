import { Fornecedor, ProdutoItem } from '@prisma/client'
import { create } from 'zustand'

export type EntradaState = {
  fornecedor: Fornecedor | null
  produtos: ProdutoItem[]
  setFornecedor: (fornecedores: Fornecedor) => void
  setProdutos: (produtos: ProdutoItem[]) => void
}

export const useEntryStore = create<EntradaState>((set) => ({
  fornecedor: null,
  produtos: [],
  setFornecedor: (fornecedor): void => set({ fornecedor }),
  setProdutos: (produtos): void => set({ produtos }),
}))
