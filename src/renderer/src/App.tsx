import Sidebar from './components/Sidebar'
import { Entrada, Estoque, Principal, Relatorios, Vendas, Equipe } from './pages/index'
import { Box, Typography } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useNavigationApp } from './store/navigatorStore'
import NovoProduto from './pages/Estoque/ProdutoModal'

function App(): JSX.Element {
  const { tabAtual } = useNavigationApp()

  return (
    <BrowserRouter>
      <Box display="flex">
        <Sidebar />
        <Box flex="flex" flexDirection="row" width="100%" height="100%" paddingX={2}>
          <Typography variant="h2" align="center" fontStyle={'italic'}>
            {tabAtual}
          </Typography>
          <Routes>
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="entrada" element={<Entrada />} />
            <Route path="vendas" element={<Vendas />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path="novo-produto" element={<NovoProduto />} />
            <Route path="equipe" element={<Equipe />} />
            <Route path="*" element={<Principal />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App
