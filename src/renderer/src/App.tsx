import Content from './components/Content'
import Sidebar from './components/Sidebar'

function App(): JSX.Element {
  return (
    <div className="container">
      <Sidebar />
      <Content>Olá</Content>
    </div>
  )
}

export default App
