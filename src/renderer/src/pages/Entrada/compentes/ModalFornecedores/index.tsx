import { Box, Button, Modal } from '@mui/material'
import StyledTextField from '../../../../components/StyledTextField'
import { AddBox } from '@mui/icons-material'
import ListSuplier from './ListSuplier'
import { useState } from 'react'
import { useSuplierStore } from '@renderer/store/suplierStore'
import ModalFormularioFornecedores from './ModalFormularioFornecedores'

function ModalFornecedores(props: { handleClose: () => void; show: boolean }): JSX.Element {
  const [requisito, setRequisito] = useState('')
  const [showForm, setShowForm] = useState(false)
  const { buscarFornecedor, setEditarFornecedor } = useSuplierStore()

  function handleShowForm(): void {
    setShowForm(true)
  }

  function handleCloseForm(): void {
    setEditarFornecedor(null)
    setShowForm(false)

    console.log('fechar form')
  }

  async function handleSubmit(): Promise<void> {
    await buscarFornecedor(requisito)
    console.log('procurar fornecedor', requisito)
  }

  return (
    <Modal
      open={props.show}
      onClose={(): void => {
        handleCloseForm()
        props.handleClose()
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 500,
          border: '1px solid #000',
          borderRadius: '10px',
          p: 4,
          bgcolor: 'background.default',
        }}
      >
        <Box display={'flex'} flexDirection={'row'} gap={1} width={'100%'}>
          <StyledTextField
            label="Nome ou Telefone"
            variant="filled"
            sx={{ width: '100%' }}
            value={requisito}
            onChange={(event): void => setRequisito(event.target.value.toUpperCase())}
            onKeyDown={(event): void => {
              if (event.key === 'Enter') handleSubmit()
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddBox />}
            sx={{ width: '120px' }}
            onClick={handleShowForm}
          >
            Novo
          </Button>
        </Box>
        <ListSuplier handleShowForm={handleShowForm} handleCloseForm={props.handleClose} />
        <ModalFormularioFornecedores handleClose={handleCloseForm} show={showForm} />
      </Box>
    </Modal>
  )
}

export default ModalFornecedores
