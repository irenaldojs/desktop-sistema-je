import { Box, Button, Modal, Typography } from '@mui/material'
import ListStock from './ListStock'
import SearchStockBar from './SearchStockBar'
import './style.css'
import { AddBox } from '@mui/icons-material'
import { useState } from 'react'
import NovoProduto from './ProdutoModal'
import { useStockStore } from '@renderer/store/stockStore'

function Estoque(): JSX.Element {
  const { editarProduto, editarProdutoItem } = useStockStore()
  const [open, setOpen] = useState(false)

  function handleOpen(): void {
    setOpen(true)
  }

  function handleClose(): void {
    setOpen(false)
    editarProduto(null)
  }

  return (
    <>
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
      <ListStock handleOpen={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-product-title"
        aria-describedby="modal-product-description"
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            border: '1px solid #000',
            borderRadius: '10px',
            p: 4,
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
          }}
        >
          <Typography id="modal-product-title" variant="h5" fontWeight={'bold'}>
            {!editarProdutoItem ? 'Novo Produto' : 'Editar Produto'}
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'column'}
            id="modal-product-description"
            alignItems={'center'}
            justifyContent={'center'}
            gap={2}
          >
            <NovoProduto handleClose={handleClose} />
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Estoque
