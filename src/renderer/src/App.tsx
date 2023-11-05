import Content from './components/Content'
import Sidebar from './components/Sidebar'
import { useSidebar } from '@renderer/store/sidebarStore'
import { Entrada, Estoque, Principal, Relatorios, Revendedores, Vendas } from './pages/index'

const pages = {
  Principal: <Principal />,
  Relatórios: <Relatorios />,
  Entrada: <Entrada />,
  Venda: <Vendas />,
  Revendedores: <Revendedores />,
  Estoque: <Estoque />,
}

function App(): JSX.Element {
  const tab = useSidebar((state) => state.tab)

  return (
    <div className="container">
      <Sidebar />
      <Content title={tab}>{pages[tab]}</Content>
    </div>
  )
}

export default App
