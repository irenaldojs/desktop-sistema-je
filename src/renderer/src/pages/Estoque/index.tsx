import { Box, Button } from '@mui/material'
import ListStock from './ListStock'
import SearchStockBar from './SearchStockBar'
import './style.css'
import { AddBox } from '@mui/icons-material'

function Estoque(): JSX.Element {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="row" width={'100%'} gap={2}>
        <SearchStockBar />
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddBox />}
          sx={{ fontSize: '1.2rem' }}
        >
          Novo
        </Button>
      </Box>
      <ListStock />
    </Box>
  )
}

export default Estoque
