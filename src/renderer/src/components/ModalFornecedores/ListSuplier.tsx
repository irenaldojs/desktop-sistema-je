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
import StyledTableCell from '../StyledTableCell'
import { EnderecoType, useSuplierStore } from '@renderer/store/suplierStore'
import { Fornecedor } from '@prisma/client'
import { useState } from 'react'
import StyledTableRow from '../StyledTableRow'
import { CheckRounded, Edit } from '@mui/icons-material'

function ListSuplier(props: { showForm: () => void }): JSX.Element {
  const { fornecedores } = useSuplierStore()
  const itensForPage = 5
  const [page, setPage] = useState(1)

  function pageFornecedores(
    listaProdutos: Fornecedor[],
    pagina: number,
    itensPorPagina: number,
  ): Fornecedor[] {
    const startIndex = (pagina - 1) * itensPorPagina
    const endIndex = startIndex + itensPorPagina
    return listaProdutos.slice(startIndex, endIndex)
  }
  const { setEditarFornecedor } = useSuplierStore()

  async function handleEdit(fornecedor: Fornecedor): Promise<void> {
    let endereco: EnderecoType = {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    }

    await window.api.prisma.endereco
      .findFirst({
        where: {
          id: fornecedor.enderecoId,
        },
      })
      .then((data) => {
        if (data) {
          endereco = {
            rua: data.rua ?? '',
            numero: data.numero ?? '',
            bairro: data.bairro ?? '',
            cidade: data.cidade ?? '',
            estado: data.estado ?? '',
          }
        }
      })

    setEditarFornecedor({
      id: fornecedor.id,
      nome: fornecedor.nome ?? '',
      telefone: fornecedor.telefone ?? '',
      endereco: {
        rua: endereco.rua ?? '',
        numero: endereco.numero ?? '',
        bairro: endereco.bairro ?? '',
        cidade: endereco.cidade ?? '',
        estado: endereco.estado ?? '',
      },
    })

    console.log(endereco)
    props.showForm()
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems={'center'}
      justifyContent={'space-between'}
      height={'100%'}
      width={'100%'}
    >
      <TableContainer sx={{ borderRadius: 2, backgroundColor: 'white' }}>
        <Table size="small" sx={{ borderCollapse: 'separate' }} aria-label="a products table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '10%', borderRight: 1 }} align="center">
                Código
              </StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }} align="center">
                Nome
              </StyledTableCell>
              <StyledTableCell sx={{ width: '20%', borderRight: 1 }} align="center">
                Telefone
              </StyledTableCell>
              <StyledTableCell sx={{ width: '10%', borderRight: 1 }} align="center">
                Editar
              </StyledTableCell>
              <StyledTableCell sx={{ width: '10%' }} align="center">
                Selecionar
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageFornecedores(fornecedores, page, itensForPage).map((f) => (
              // eslint-disable-next-line react/jsx-key
              <StyledTableRow key={f.id}>
                <StyledTableCell align="left" sx={{ borderRight: 1 }}>
                  {f.id}
                </StyledTableCell>
                <StyledTableCell align="left" sx={{ borderRight: 1 }}>
                  {f.nome}
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ borderRight: 1 }}>
                  {f.telefone}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ borderRight: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={(): Promise<void> => handleEdit(f)}
                  >
                    <Edit fontSize="small" />
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" size="small" color="secondary">
                    <CheckRounded fontSize="small" />
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
        count={Math.ceil(fornecedores.length / itensForPage)}
        onChange={(_, p): void => setPage(p)}
      />
    </Box>
  )
}

export default ListSuplier
