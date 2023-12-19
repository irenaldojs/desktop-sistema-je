import { TableCell, styled, tableCellClasses } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 16,
    padding: '5px 5px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: '5px 10px',
  },
}))

export default StyledTableCell
