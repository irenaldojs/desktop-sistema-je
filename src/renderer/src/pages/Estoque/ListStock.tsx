import { Edit } from '@mui/icons-material'
import {
  Box,
  Button,
  Pagination,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Produto } from '@prisma/client'
import StyledTableCell from '@renderer/components/StyledTableCell'
import StyledTableRow from '@renderer/components/StyledTableRow'
import { DbToFront } from '@renderer/lib/convertMoney'
import { useStockStore } from '@renderer/store/stockStore'
import { useState } from 'react'

function ListStock(props: { handleOpen: () => void }): JSX.Element {
  const { produtos, editarProduto } = useStockStore()
  const itensForPage = 10
  const [page, setPage] = useState(1)

  function handleEdit(produto: Produto): void {
    editarProduto(produto)
    props.handleOpen()
  }

  function pageProdutos(
    listaProdutos: Produto[],
    pagina: number,
    itensPorPagina: number,
  ): Produto[] {
    const startIndex = (pagina - 1) * itensPorPagina
    const endIndex = startIndex + itensPorPagina
    return listaProdutos.slice(startIndex, endIndex)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems={'center'}
      justifyContent={'space-between'}
      height={'100%'}
    >
      <TableContainer sx={{ borderRadius: 2, backgroundColor: 'white' }}>
        <Table size="small" sx={{ borderCollapse: 'separate' }} aria-label="a products table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '10%', borderRight: 1 }} align="center">
                Código
              </StyledTableCell>
              <StyledTableCell sx={{ width: '30%', borderRight: 1 }} align="center">
                Descricão
              </StyledTableCell>
              <StyledTableCell sx={{ width: '10%', borderRight: 1 }} align="center">
                Marca
              </StyledTableCell>
              <StyledTableCell sx={{ width: '5%', borderRight: 1 }} align="center">
                Tamanho
              </StyledTableCell>
              <StyledTableCell sx={{ width: '10%', borderRight: 1 }} align="center">
                Cor
              </StyledTableCell>
              <StyledTableCell sx={{ width: '10%', borderRight: 1 }} align="center">
                Local
              </StyledTableCell>
              <StyledTableCell sx={{ width: '5%', borderRight: 1 }} align="center">
                Estoque
              </StyledTableCell>
              <StyledTableCell sx={{ width: '10%', borderRight: 1 }} align="center">
                R$
              </StyledTableCell>
              <StyledTableCell>Editar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageProdutos(produtos, page, itensForPage).map((p: Produto) => (
              <StyledTableRow key={p.id}>
                <StyledTableCell sx={{ borderRight: 1 }}>{p.codigoOriginal}</StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1 }}>{p.descricao}</StyledTableCell>
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
                  {p.local}
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1 }} align="right">
                  {p.estoque}
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1 }} align="right">
                  {p.precoVenda && DbToFront(p.precoVenda)}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={(): void => handleEdit(p)}
                  >
                    <Edit fontSize="small" />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        variant="text"
        shape="rounded"
        color="secondary"
        page={page}
        count={Math.ceil(produtos.length / itensForPage)}
        onChange={(_, p): void => setPage(p)}
      />
    </Box>
  )
}

export default ListStock
