import Content from './components/Content'
import Sidebar from './components/Sidebar'
import { useSidebar } from '@renderer/store/sidebarStore'
import { Entrada, Estoque, Principal, Relatorios, Vendas, Equipe } from './pages/index'
import { Box } from '@mui/material'

const pages = {
  Principal: <Principal />,
  Relatórios: <Relatorios />,
  Entrada: <Entrada />,
  Equipe: <Equipe />,
  Venda: <Vendas />,
  Estoque: <Estoque />,
}

function App(): JSX.Element {
  const tab = useSidebar((state) => state.tab)

  return (
    <Box display="flex">
      <Sidebar />
      <Content title={tab}>{pages[tab]}</Content>
    </Box>
  )
}

export default App
