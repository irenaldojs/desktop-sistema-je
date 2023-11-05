import { create } from 'zustand'

export type TabType = 'Principal' | 'Relatórios' | 'Entrada' | 'Venda' | 'Revendedores' | 'Estoque'

type SidebarStoreType = {
  tab: TabType
  changeTab: (tab: TabType) => void
}

export const useSidebar = create<SidebarStoreType>((set) => ({
  tab: 'Principal',
  changeTab: (tab: TabType): void => set(() => ({ tab: tab })),
}))
