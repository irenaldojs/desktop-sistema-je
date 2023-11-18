import { Box, Button, Modal } from '@mui/material'
import ListStock from './ListStock'
import SearchStockBar from './SearchStockBar'
import './style.css'
import { AddBox } from '@mui/icons-material'
import { useState } from 'react'
import NovoProduto from './ProdutoModal'

function Estoque(): JSX.Element {
  const [open, setOpen] = useState(false)

  function handleOpen(): void {
    setOpen(true)
  }

  function handleClose(): void {
    setOpen(false)
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection="row" width={'100%'} gap={2}>
        <SearchStockBar />
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddBox />}
          sx={{ fontSize: '1.2rem' }}
          onClick={(): void => handleOpen()}
        >
          Novo
        </Button>
      </Box>
      <ListStock />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-novo-produto">
        <NovoProduto handleClose={handleClose} />
      </Modal>
    </Box>
  )
}

export default Estoque
