import Sidebar from './components/Sidebar'
import { Entrada, Estoque, Principal, Relatorios, Equipe, Devolucao, Venda } from './pages/index'
import { Box, Typography } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useNavigationApp } from './store/navigatorStore'

function App(): JSX.Element {
  const { tabAtual } = useNavigationApp()

  return (
    <BrowserRouter>
      <Box display="flex" height={'100vh'}>
        <Sidebar />
        <Box flex="flex" flexDirection="row" width="100%" paddingX={2} height={'100vh'}>
          <Typography variant="h2" align="center" fontStyle={'italic'}>
            {tabAtual}
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} height={'85vh'}>
            <Routes>
              <Route path="relatorios" element={<Relatorios />} />
              <Route path="entrada" element={<Entrada />} />
              <Route path="venda" element={<Venda />} />
              <Route path="estoque" element={<Estoque />} />
              <Route path="equipe" element={<Equipe />} />
              <Route path="devolucao" element={<Devolucao />} />
              <Route path="*" element={<Principal />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App
