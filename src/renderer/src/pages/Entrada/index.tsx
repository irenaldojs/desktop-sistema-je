import { AddBox } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Entrada(): JSX.Element {
  const navigate = useNavigate()
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Typography marginLeft={2} typography={'h5'} fontWeight="bolder">
          Entradas
        </Typography>
      </Box>
      <Box display={'flex'} gap={1}>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddBox />}
          sx={{ fontSize: '1rem' }}
          onClick={(): void => navigate('/entrada/nova')}
        >
          Nova Entrada
        </Button>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddBox />}
          sx={{ fontSize: '1rem' }}
          onClick={(): void => navigate('/entrada/arquivadas')}
        >
          Arquivadas
        </Button>
      </Box>
    </Box>
  )
}

export default Entrada
