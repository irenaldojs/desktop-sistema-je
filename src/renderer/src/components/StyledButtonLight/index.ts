import { Button, styled, buttonClasses } from '@mui/material'

const StyledButttonLight = styled(Button)(({ theme }) => ({
  [`&.${buttonClasses.contained}`]: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #b0b0b0',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    '&:hover': {
      backgroundColor: '#b0b0b0',
    },
  },
}))

export default StyledButttonLight
