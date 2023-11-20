import { TableCell, styled, tableCellClasses } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}))

export default StyledTableCell
