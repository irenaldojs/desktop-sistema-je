import Content from './components/Content'
import Sidebar from './components/Sidebar'
import { useSidebar } from './store/SideBarStore'

function App(): JSX.Element {
  const tab = useSidebar((state) => state.tab)
  return (
    <div className="container">
      <Sidebar />
      <Content>{tab}</Content>
    </div>
  )
}

export default App
