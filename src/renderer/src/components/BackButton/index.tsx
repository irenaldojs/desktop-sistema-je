import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function BackButton(props: { path: string }): JSX.Element {
  const navigate = useNavigate()

  return (
    <Button
      onClick={(): void => navigate(props.path)}
      variant="contained"
      color="secondary"
      startIcon={<ArrowBack />}
      sx={{ fontSize: '1rem' }}
    >
      Voltar
    </Button>
  )
}

export default BackButton
