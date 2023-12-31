import { Box, Button } from '@mui/material'
import ListStock from './ListStock'
import SearchStockBar from './SearchStockBar'
import './style.css'
import { AddBox } from '@mui/icons-material'
import { useState } from 'react'
import { useStockStore } from '@renderer/store/stockStore'
import ModalProduto from '@renderer/components/ModalProduto'

function Estoque(): JSX.Element {
  const { editarProduto } = useStockStore()
  const [showModalProduto, setShowModalProduto] = useState(false)

  function handleOpen(): void {
    setShowModalProduto(true)
  }

  function handleClose(): void {
    editarProduto(null)
    setShowModalProduto(false)
  }

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} gap={1}>
      <Box display="flex" flexDirection="row" width={'100%'} gap={2}>
        <SearchStockBar />
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddBox />}
          sx={{ fontSize: '1rem' }}
          onClick={(): void => handleOpen()}
        >
          Novo produto
        </Button>
      </Box>
      <ListStock handleOpen={handleOpen} />
      <ModalProduto handleClose={handleClose} show={showModalProduto} />
    </Box>
  )
}

export default Estoque
