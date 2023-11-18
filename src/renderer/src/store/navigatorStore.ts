import { create } from 'zustand'

export type TabsType = 'Principal' | 'Estoque' | 'Entrada' | 'Vendas' | 'Relatórios' | 'Equipe'

type NavigatorStore = {
  tabAtual: TabsType
  rota: string
  setTabAtual: (tab: TabsType) => string
}

const rotas = {
  Principal: '/',
  Estoque: '/estoque',
  Entrada: '/entrada',
  Vendas: '/vendas',
  Relatórios: '/relatorios',
  Equipe: '/equipe',
}

export const useNavigationApp = create<NavigatorStore>((set) => ({
  tabAtual: 'Principal',
  rota: rotas.Principal,
  setTabAtual: (tab: TabsType): string => {
    set({ tabAtual: tab, rota: rotas[tab] })
    return rotas[tab]
  },
}))
