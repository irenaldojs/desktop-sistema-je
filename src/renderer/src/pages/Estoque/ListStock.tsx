import { Edit } from '@mui/icons-material'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from '@mui/material'
import { Produto } from '@prisma/client'
import { useListStock } from '@renderer/store/listStockStore'

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
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    //border: 0,
  },
}))

function ListStock(): JSX.Element {
  const produtos = useListStock((state) => state.produtos)

  return (
    <TableContainer sx={{ borderRadius: 2 }}>
      <Table component={Paper} size="small" sx={{ borderCollapse: 'separate' }}>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: '10%', borderRight: 1 }}>Código</StyledTableCell>
            <StyledTableCell sx={{ width: '30%', borderRight: 1 }}>Descricão</StyledTableCell>
            <StyledTableCell sx={{ width: '5%', borderRight: 1 }}>Estoque</StyledTableCell>
            <StyledTableCell sx={{ width: '10%', borderRight: 1 }}>Marca</StyledTableCell>
            <StyledTableCell sx={{ width: '5%', borderRight: 1 }}>Tamanho</StyledTableCell>
            <StyledTableCell sx={{ width: '10%', borderRight: 1 }}>Cor</StyledTableCell>
            <StyledTableCell sx={{ width: '10%', borderRight: 1 }}>Preço</StyledTableCell>
            <StyledTableCell sx={{ width: '10%', borderRight: 1 }}>Local</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtos.map((p: Produto) => (
            <StyledTableRow key={p.id}>
              <StyledTableCell sx={{ borderRight: 1 }}>{p.codigoOriginal}</StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }}>{p.descricao}</StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }} align="right">
                {p.estoque}
              </StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }} align="center">
                {p.marca}
              </StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }} align="center">
                {p.tamanho}
              </StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }} align="center">
                {p.cor}
              </StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }} align="right">
                {p.precoVenda}
              </StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }}>{p.local}</StyledTableCell>
              <StyledTableCell>
                <Button color="secondary" variant="contained" size="small">
                  <Edit fontSize="small" />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListStock
