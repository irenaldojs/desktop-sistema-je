import { Box } from '@mui/material'
import ListStock from './ListStock'
import SearchStockBar from './SearchStockBar'
import './style.css'

function Estoque(): JSX.Element {
  return (
    <Box>
      <SearchStockBar />
      <ListStock />
    </Box>
  )
}

export default Estoque
