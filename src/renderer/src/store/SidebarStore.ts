import { create } from 'zustand'

type TabType = 'Principal' | 'Relatórios' | 'Entrada' | 'Venda' | 'Revendedores' | 'Estoque'

type SidebarStoreType = {
  tab: TabType
  changeTab: (tab: TabType) => void
}

export const useSidebar = create<SidebarStoreType>((set) => ({
  tab: 'Principal',
  changeTab: (tab: TabType): void => set(() => ({ tab: tab })),
}))
