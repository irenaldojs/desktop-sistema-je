import { Box, Button, Modal, Typography } from '@mui/material'
import ListStock from './ListStock'
import SearchStockBar from './SearchStockBar'
import './style.css'
import { AddBox } from '@mui/icons-material'
import { useState } from 'react'
import { useStockStore } from '@renderer/store/stockStore'
import ProdutoModal from '@renderer/components/ProdutoModal'

function Estoque(): JSX.Element {
  const { editarProduto } = useStockStore()
  const [showModalProduto, setShowModalProduto] = useState(false)

  function handleOpen(): void {
    setShowModalProduto(true)
  }

  function handleClose(): void {
    setShowModalProduto(false)
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
      <ProdutoModal handleClose={handleClose} show={showModalProduto} />
    </>
  )
}

export default Estoque
