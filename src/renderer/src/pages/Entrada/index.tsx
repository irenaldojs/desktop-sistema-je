import { Box, Typography } from '@mui/material'
import ModalFornecedores from '@renderer/components/ModalFornecedores'
import StyledButttonLight from '@renderer/components/StyledButtonLight'
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
    >
      <Box>
        <Typography marginLeft={2}>Fornecedor</Typography>
        {fornecedor ? (
          <Typography>{fornecedor.nome}</Typography>
        ) : (
          <StyledButttonLight
            variant="contained"
            sx={{ width: '100%' }}
            onClick={(): void => setShowModalFornecedores(true)}
          >
            Nenhum fornecedor selecionado
          </StyledButttonLight>
        )}
      </Box>
      <ModalFornecedores
        handleClose={(): void => setShowModalFornecedores(false)}
        show={showModalFornecedores}
      />
    </Box>
  )
}

export default Entrada
