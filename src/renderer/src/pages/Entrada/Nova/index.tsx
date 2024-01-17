import { AddBox, LocalShipping } from '@mui/icons-material'
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
import BackButton from '@renderer/components/BackButton'
import ModalListaProdutos from '@renderer/pages/Entrada/compentes/ModalListaProdutos'
import StyledTableCell from '@renderer/components/StyledTableCell'
import StyledTableRow from '@renderer/components/StyledTableRow'
import { DbToFront } from '@renderer/lib/convertMoney'
import { ProdutoItemType, useEntryStore } from '@renderer/store/entryStore'
import { useState } from 'react'
import ModalFornecedores from '../compentes/ModalFornecedores'

function NovaEntrada(): JSX.Element {
  const { fornecedor, produtos, AddProdutoEntry } = useEntryStore()
  const [showModalFornecedores, setShowModalFornecedores] = useState(false)
  const [showModalProdutos, setShowModalProdutos] = useState(false)

  function handleInsert(produto: ProdutoItemType): void {
    AddProdutoEntry(produto)
  }

  function returnTotal(): number {
    let total = 0
    produtos.forEach((item) => {
      if (item.produto.precoVenda) total += item.produto.precoVenda * item.quantidade
    })
    return total
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1} height={'100%'}>
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Typography marginLeft={2} typography={'h5'} fontWeight="bolder">
          Entradas
        </Typography>
      </Box>
      <Box>
        <BackButton path="/entrada" />
      </Box>

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
              startIcon={<LocalShipping />}
            >
              Selecionar
            </Button>
          </Box>
        </Box>
        <Box
          height={'100%'}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap={1}
        >
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
                  <StyledTableCell
                    sx={{ borderRight: 1, width: '5%', maxWidth: '5%' }}
                    align="center"
                  >
                    Quantidade
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ borderRight: 1, width: '10%', maxWidth: '10%' }}
                    align="center"
                  >
                    Unitário
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: '10%', maxWidth: '10%' }} align="center">
                    Total
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produtos.map((item) => (
                  <StyledTableRow key={item.produto.id}>
                    <StyledTableCell sx={{ borderRight: 1 }}>{item.produto.id}</StyledTableCell>
                    <StyledTableCell sx={{ borderRight: 1 }}>
                      {item.produto.descricao}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ borderRight: 1, width: '5%', maxWidth: '5%' }}
                      align="right"
                    >
                      {item.quantidade}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ borderRight: 1, width: '10%', maxWidth: '10%' }}
                      align="right"
                    >
                      {item.produto.precoVenda && DbToFront(item.produto.precoVenda)}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '10%', maxWidth: '10%' }} align="right">
                      {item.produto.precoVenda &&
                        DbToFront(item.produto.precoVenda * item.quantidade)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            gap={1}
            paddingX={1}
          >
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddBox />}
              onClick={(): void => setShowModalProdutos(true)}
            >
              Adicionar
            </Button>
            <Box display="flex">
              <Typography variant="h5">Total </Typography>
              <Typography variant="h4" align="right" fontWeight="bold" sx={{ minWidth: '150px' }}>
                {DbToFront(returnTotal())}
              </Typography>
            </Box>
          </Box>
        </Box>
        <ModalFornecedores
          handleClose={(): void => setShowModalFornecedores(false)}
          show={showModalFornecedores}
        />
        <ModalListaProdutos
          handleClose={(): void => setShowModalProdutos(false)}
          handleInsert={handleInsert}
          show={showModalProdutos}
        />
      </Box>
    </Box>
  )
}

export default NovaEntrada
