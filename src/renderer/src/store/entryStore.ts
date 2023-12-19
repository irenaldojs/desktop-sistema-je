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
  AddProdutoEntry: (produto: Produto) => void
}

export const useEntryStore = create<EntradaState>((set) => ({
  fornecedor: null,
  produtos: [],
  setFornecedor: (fornecedor): void => set({ fornecedor }),

  AddProdutoEntry: (produto): void => {
    if (!useEntryStore.getState().produtos.filter((item) => item.produto.id === produto.id).length)
      set({ produtos: [...useEntryStore.getState().produtos, { quantidade: 1, produto }] })
    else
      set({
        produtos: useEntryStore
          .getState()
          .produtos.map((item) =>
            item.produto.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item,
          ),
      })
  },
}))
