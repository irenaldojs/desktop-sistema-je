import { AddBox } from '@mui/icons-material'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import ModalFornecedores from '@renderer/components/ModalFornecedores'
import StyledTableCell from '@renderer/components/StyledTableCell'
import StyledTableRow from '@renderer/components/StyledTableRow'
import { useEntryStore } from '@renderer/store/entryStore'
import { useState } from 'react'

function Entrada(): JSX.Element {
  const { fornecedor, produtos } = useEntryStore()
  const [showModalFornecedores, setShowModalFornecedores] = useState(false)

  return (
    <Box
      display="flex"
      flexDirection="column"
      border={'1px solid var(--secondary-color)'}
      padding={2}
      gap={2}
      sx={{ borderRadius: '5px' }}
      component={Paper}
      height={'100%'}
    >
      <Box>
        <Typography marginLeft={2} fontWeight="bold" fontSize="1rem">
          Fornecedor
        </Typography>
        <Box display="flex" flexDirection="row" gap={1}>
          <Typography
            border={1}
            padding={1}
            borderRadius={1}
            fontWeight={'bold'}
            sx={{ flexGrow: 1 }}
          >
            {fornecedor ? fornecedor.nome?.toUpperCase() : 'Nenhum fornecedor selecionado'}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={(): void => setShowModalFornecedores(true)}
            startIcon={<AddBox />}
          >
            Selecionar
          </Button>
        </Box>
      </Box>
      <Box height={'100%'} display="flex" flexDirection="column" justifyContent="space-between">
        <TableContainer
          sx={{
            borderRadius: 2,
            border: 1,
            height: '100%',
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ borderRight: 1 }} align="center">
                  Codigo
                </StyledTableCell>
                <StyledTableCell sx={{ width: '50%', borderRight: 1 }} align="center">
                  Descrição
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1 }} align="center">
                  Quantidade
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1 }} align="center">
                  Unitário
                </StyledTableCell>
                <StyledTableCell align="center">Total</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((item) => (
                <StyledTableRow key={item.produto.id}>
                  <StyledTableCell>{item.produto.id}</StyledTableCell>
                  <StyledTableCell>{item.produto.descricao}</StyledTableCell>
                  <StyledTableCell>{item.quantidade}</StyledTableCell>
                  <StyledTableCell>{}</StyledTableCell>
                  <StyledTableCell>{}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" flexDirection="row" justifyContent="end" gap={1} paddingX={1}>
          <Typography variant="h5">Total </Typography>
          <Typography variant="h4" align="right" fontWeight="bold" sx={{ minWidth: '150px' }}>
            R$ 0,00
          </Typography>
        </Box>
      </Box>
      <ModalFornecedores
        handleClose={(): void => setShowModalFornecedores(false)}
        show={showModalFornecedores}
      />
    </Box>
  )
}

export default Entrada
