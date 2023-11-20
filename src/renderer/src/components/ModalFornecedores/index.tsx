import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import StyledTextField from '../StyledTextField'
import { AddBox } from '@mui/icons-material'

function ModalFornecedores(props: { handleClose: () => void; show: boolean }) {
  return (
    <Modal open={props.show} onClose={props.handleClose}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 400,
          border: '1px solid #000',
          borderRadius: '10px',
          p: 4,
          bgcolor: 'background.default',
        }}
      >
        <Box display={'flex'} flexDirection={'row'} gap={1} width={'100%'}>
          <StyledTextField label="Nome Fornecedor" variant="filled" sx={{ width: '100%' }} />
          <Button
            variant="contained"
            startIcon={<AddBox />}
            color="secondary"
            sx={{ width: '120px' }}
          >
            Novo
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalFornecedores
