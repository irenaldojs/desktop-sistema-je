import { Box, Button, Typography } from '@mui/material'
import ModalFornecedores from '@renderer/components/ModalFornecedores'
import { useEntryStore } from '@renderer/store/entryStore'
import { useState } from 'react'

function Entrada(): JSX.Element {
  const { fornecedor } = useEntryStore()
  const [showModalForonecedores, setShowModalForonecedores] = useState(false)

  return (
    <Box
      display="flex"
      flexDirection="column"
      border={'1px solid var(--secondary-color)'}
      padding={2}
      sx={{ borderRadius: '5px' }}
    >
      <Box>
        <Typography marginLeft={2}>Fornecedor</Typography>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ width: '100%' }}
          onClick={(): void => setShowModalForonecedores(true)}
        >
          {fornecedor ? fornecedor.nome : 'Nenhum fornecedor selecionado'}
        </Button>
      </Box>
      <ModalFornecedores
        handleClose={(): void => setShowModalForonecedores(false)}
        show={showModalForonecedores}
      />
    </Box>
  )
}

export default Entrada
