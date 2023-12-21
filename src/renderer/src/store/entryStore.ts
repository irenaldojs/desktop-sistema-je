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
    set((state) => {
      const index = state.produtos.findIndex((item) => item.produto.id === produto.produto.id)
      if (index !== -1) {
        return {
          produtos: [
            ...state.produtos.slice(0, index),
            {
              ...state.produtos[index],
              quantidade: state.produtos[index].quantidade + produto.quantidade,
            },
            ...state.produtos.slice(index + 1),
          ],
        }
      } else {
        return {
          produtos: [...state.produtos, { ...produto, quantidade: 1 }],
        }
      }
    })
  },
}))
