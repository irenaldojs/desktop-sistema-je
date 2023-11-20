import { TextField, styled } from '@mui/material'

const StyledTextField = styled(TextField)({
  variant: 'filled',
  border: '1px solid var(--secondary-color)',
  borderRadius: '5px',
  backgroundColor: 'white',
  ['& .MuiInputLabel-root']: {
    color: 'black',
  },
  ['& label.Mui-focused']: {
    color: 'black',
  },
  ['& .MuiInput-underline:after']: {
    borderBottomColor: 'var(--secondary-color)',
  },
  ['& .MuiFilledInput-root']: {
    ['& fieldset']: {
      borderColor: 'var(--secondary-color)',
      fontWeight: 'bold',
    },
    ['&:hover fieldset']: {
      borderColor: 'var(--secondary-color)',
    },
    ['&.Mui-focused fieldset']: {
      borderColor: 'var(--secondary-color)',
    },
  },
  ['& .MuiFormHelperText-root']: {
    color: 'red',
    fontSize: '0.9rem',
    fontStyle: 'italic',
  },
  ['& .MuiInputBase-input']: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
})

export default StyledTextField
