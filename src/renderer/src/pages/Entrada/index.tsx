import { AddBox } from '@mui/icons-material'
import { Box, Button, Paper, Typography } from '@mui/material'
import ModalFornecedores from '@renderer/components/ModalFornecedores'
import { useEntryStore } from '@renderer/store/entryStore'
import { useState } from 'react'

function Entrada(): JSX.Element {
  const { fornecedor } = useEntryStore()
  const [showModalFornecedores, setShowModalFornecedores] = useState(false)

  return (
    <Box
      display="flex"
      flexDirection="column"
      border={'1px solid var(--secondary-color)'}
      padding={2}
      sx={{ borderRadius: '5px' }}
      component={Paper}
    >
      <Box>
        <Typography marginLeft={2} fontWeight="bold" fontSize="1rem">
          Fornecedor
        </Typography>
        <Box display="flex" flexDirection="row" gap={1}>
          <Typography
            border={1}
            padding={1}
            borderRadius={1}
            fontWeight={'bold'}
            sx={{ flexGrow: 1 }}
          >
            {fornecedor ? fornecedor.nome?.toUpperCase() : 'Nenhum fornecedor selecionado'}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={(): void => setShowModalFornecedores(true)}
            startIcon={<AddBox />}
          >
            Selecionar
          </Button>
        </Box>
      </Box>
      <ModalFornecedores
        handleClose={(): void => setShowModalFornecedores(false)}
        show={showModalFornecedores}
      />
    </Box>
  )
}

export default Entrada
