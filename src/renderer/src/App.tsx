import Sidebar from './components/Sidebar'
import Arquivadas from './pages/Entrada/Arquivadas'
import NovaEntrada from './pages/Entrada/Nova'
import { Entrada, Estoque, Principal, Relatorios, Equipe, Devolucao, Venda } from './pages/index'
import { Box } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Box display="flex" height={'100vh'} flexDirection={'row'}>
        <Sidebar />
        <Box flex="flex" flexDirection="column" width="100%" padding={2} gap={2}>
          <Routes>
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="entrada" element={<Entrada />} />
            <Route path="venda" element={<Venda />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path="equipe" element={<Equipe />} />
            <Route path="devolucao" element={<Devolucao />} />
            <Route path="entrada/nova" element={<NovaEntrada />} />
            <Route path="entrada/arquivadas" element={<Arquivadas />} />
            <Route path="*" element={<Principal />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App
