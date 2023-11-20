import { create } from 'zustand'

export type TabsType =
  | 'Principal'
  | 'Estoque'
  | 'Entrada'
  | 'Venda'
  | 'Relatórios'
  | 'Equipe'
  | 'Devolução'

type NavigatorStore = {
  tabAtual: TabsType
  rota: string
  setTabAtual: (tab: TabsType) => string
}

const rotas = {
  Principal: '/',
  Estoque: '/estoque',
  Entrada: '/entrada',
  Venda: '/venda',
  Relatórios: '/relatorios',
  Equipe: '/equipe',
  Devolução: '/devolucao',
}

export const useNavigationApp = create<NavigatorStore>((set) => ({
  tabAtual: 'Principal',
  rota: rotas.Principal,
  setTabAtual: (tab: TabsType): string => {
    set({ tabAtual: tab, rota: rotas[tab] })
    return rotas[tab]
  },
}))
