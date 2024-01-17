import {
  Box,
  Button,
  Modal,
  Pagination,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useState } from 'react'
import { Produto } from '@prisma/client'
import { ProdutoItemType } from '@renderer/store/entryStore'
import StyledTextField from '../../../../components/StyledTextField'
import StyledTableCell from '../../../../components/StyledTableCell'
import StyledTableRow from '../../../../components/StyledTableRow'
import { DbToFront } from '@renderer/lib/convertMoney'
import { AddRounded, Search } from '@mui/icons-material'

type ModalListPordutosType = {
  handleClose: () => void
  handleInsert: (produto: ProdutoItemType) => void
  show: boolean
}

function ModalListaProdutos(props: ModalListPordutosType): JSX.Element {
  const [requisito, setRequisito] = useState<string>('')
  const [listaProdutos, setListaProdutos] = useState<Array<Produto> | []>([])
  const [page, setPage] = useState(1)
  const itensForPage = 10
  const [showModalInsert, setShowModalInsert] = useState(false)
  const [produto, setProduto] = useState<Produto | null>(null)
  const [quantidade, setQuantidade] = useState<number>(1)

  async function handleSubmit(): Promise<void> {
    const lista = await window.api.prisma.produto.findMany({
      where: {
        OR: [
          {
            codigoOriginal: {
              contains: requisito,
            },
          },
          {
            descricao: {
              contains: requisito,
            },
          },
        ],
      },
    })
    console.log('lista', lista)
    if (requisito === '') {
      setListaProdutos([])
    } else {
      setListaProdutos(lista)
    }
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
    <Modal open={props.show} onClose={props.handleClose}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          border: '1px solid #000',
          borderRadius: '10px',
          p: 4,
          bgcolor: 'background.default',
        }}
      >
        <Box display={'flex'} flexDirection={'row'} gap={1} width={'100%'}>
          <StyledTextField
            label="Codigo ou Descricão"
            variant="filled"
            sx={{ width: '100%' }}
            onChange={(event): void => setRequisito(event.target.value.toLocaleLowerCase())}
            onKeyDown={(event): void => {
              if (event.key === 'Enter') handleSubmit()
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Search />}
            sx={{ width: '120px' }}
            onClick={(): Promise<void> => handleSubmit()}
          >
            Buscar
          </Button>
        </Box>
        <TableContainer
          sx={{ borderRadius: 2, backgroundColor: 'white', flexGrow: 1, height: 410, border: 1 }}
        >
          <Table size="small" sx={{ borderCollapse: 'separate' }} aria-label="a products table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  sx={{ borderRight: 1, maxWidth: 150, width: 150, overflow: 'hidden' }}
                  align="center"
                >
                  Código
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1 }} align="center">
                  Descrição
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1, width: 100, maxWidth: 100 }} align="center">
                  Marca
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1, width: 50, maxWidth: 50 }} align="center">
                  Tam.
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1, width: 100, maxWidth: 100 }} align="center">
                  Cor
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1, width: 50, maxWidth: 50 }} align="center">
                  Est.
                </StyledTableCell>
                <StyledTableCell sx={{ width: 80, maxWidth: 80, borderRight: 1 }} align="center">
                  Preço
                </StyledTableCell>
                <StyledTableCell sx={{ width: 40, maxWidth: 40 }} align="center">
                  #
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageProdutos(listaProdutos, page, itensForPage).map((p) => (
                // eslint-disable-next-line react/jsx-key
                <StyledTableRow key={p.id}>
                  <StyledTableCell
                    align="left"
                    sx={{ borderRight: 1, maxWidth: 150, width: 150, overflow: 'hidden' }}
                  >
                    {p.codigoOriginal}
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ borderRight: 1 }}>
                    {p.descricao}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ borderRight: 1, width: 100, maxWidth: 100 }}
                  >
                    {p.marca}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      borderRight: 1,
                      width: 50,
                      maxWidth: 50,
                      overflow: 'hidden',
                    }}
                  >
                    {p.tamanho}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ borderRight: 1, width: 100, maxWidth: 100 }}
                  >
                    {p.cor}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    sx={{ borderRight: 1, width: 50, maxWidth: 50, overflow: 'hidden' }}
                  >
                    {p.estoque}
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{ width: 80, maxWidth: 80, borderRight: 1 }}>
                    {p.precoVenda && DbToFront(p.precoVenda)}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ maxWidth: 30 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={(): void => {
                        setProduto(p)
                        setShowModalInsert(true)
                      }}
                      sx={{ minWidth: 25, minHeight: 20, padding: 0 }}
                    >
                      <AddRounded fontSize="small" />
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
          count={Math.ceil(listaProdutos.length / itensForPage)}
          onChange={(_, p): void => setPage(p)}
        />
        <Modal open={showModalInsert} onClose={(): void => setShowModalInsert(false)}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={2}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid #000',
              borderRadius: '10px',
              p: 4,
              bgcolor: 'background.default',
            }}
          >
            <StyledTextField
              label="Quantidade"
              variant="filled"
              type="string"
              value={quantidade}
              onChange={(event): void => setQuantidade(Number(event.target.value))}
            />
            <Box display={'flex'} gap={2}>
              <Button
                variant="contained"
                onClick={(): void => {
                  setShowModalInsert(false)
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={(): void => {
                  if (!produto || quantidade <= 0) return
                  const item: ProdutoItemType = { produto: produto, quantidade: Number(quantidade) }
                  console.log(item)
                  props.handleInsert(item)

                  setProduto(null)
                  setShowModalInsert(false)
                  setQuantidade(1)
                }}
              >
                Adicionar
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Modal>
  )
}

export default ModalListaProdutos

/*
<DraggableDialog
      onClose={props.handleClose}
      open={props.show}
      title={'Lista de Produtos'}
      handleSelector="list-product-modal"
      maxWidth="lg"
    >
      <Box display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>
        <Box display={'flex'} flexDirection={'row'} gap={1} width={'100%'}>
          <StyledTextField
            label="Codigo ou Descricão"
            variant="filled"
            sx={{ width: '100%' }}
            onChange={(event): void => setRequisito(event.target.value.toLocaleLowerCase())}
            onKeyDown={(event): void => {
              if (event.key === 'Enter') handleSubmit()
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Search />}
            sx={{ width: '120px' }}
            onClick={(): Promise<void> => handleSubmit()}
          >
            Buscar
          </Button>
        </Box>
        <TableContainer
          sx={{ borderRadius: 2, backgroundColor: 'white', flexGrow: 1, height: 410 }}
        >
          <Table size="small" sx={{ borderCollapse: 'separate' }} aria-label="a products table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  sx={{ borderRight: 1, maxWidth: 150, width: 150, overflow: 'hidden' }}
                  align="center"
                >
                  Código
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1 }} align="center">
                  Descrição
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1, width: 100, maxWidth: 100 }} align="center">
                  Marca
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1, width: 50, maxWidth: 50 }} align="center">
                  Tam.
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1, width: 100, maxWidth: 100 }} align="center">
                  Cor
                </StyledTableCell>
                <StyledTableCell sx={{ borderRight: 1, width: 50, maxWidth: 50 }} align="center">
                  Est.
                </StyledTableCell>
                <StyledTableCell sx={{ width: 80, maxWidth: 80, borderRight: 1 }} align="center">
                  Preço
                </StyledTableCell>
                <StyledTableCell sx={{ width: 40, maxWidth: 40 }} align="center">
                  #
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageProdutos(listaProdutos, page, itensForPage).map((p) => (
                // eslint-disable-next-line react/jsx-key
                <StyledTableRow key={p.id}>
                  <StyledTableCell
                    align="left"
                    sx={{ borderRight: 1, maxWidth: 150, width: 150, overflow: 'hidden' }}
                  >
                    {p.codigoOriginal}
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ borderRight: 1 }}>
                    {p.descricao}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ borderRight: 1, width: 100, maxWidth: 100 }}
                  >
                    {p.marca}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{
                      borderRight: 1,
                      width: 50,
                      maxWidth: 50,
                      overflow: 'hidden',
                    }}
                  >
                    {p.tamanho}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ borderRight: 1, width: 100, maxWidth: 100 }}
                  >
                    {p.cor}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    sx={{ borderRight: 1, width: 50, maxWidth: 50, overflow: 'hidden' }}
                  >
                    {p.estoque}
                  </StyledTableCell>
                  <StyledTableCell align="right" sx={{ width: 80, maxWidth: 80, borderRight: 1 }}>
                    {p.precoVenda && DbToFront(p.precoVenda)}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ maxWidth: 30 }}>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={(): void => {
                        setProduto(p)
                        setShowModalInsert(true)
                      }}
                      sx={{ minWidth: 25, minHeight: 20, padding: 0 }}
                    >
                      <AddRounded fontSize="small" />
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
          count={Math.ceil(listaProdutos.length / itensForPage)}
          onChange={(_, p): void => setPage(p)}
        />
      </Box>
      <DraggableDialog
        open={showModalInsert}
        onClose={(): void => setShowModalInsert(false)}
        handleSelector="dialog-insert-product"
        title="Inseririr Produto"
        maxWidth="sm"
      >
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
          <StyledTextField
            label="Quantidade"
            variant="filled"
            type="string"
            value={quantidade}
            onChange={(event): void => setQuantidade(Number(event.target.value))}
          />
          <Box display={'flex'} gap={2}>
            <Button
              variant="contained"
              onClick={(): void => {
                setShowModalInsert(false)
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={(): void => {
                if (!produto || quantidade <= 0) return
                const item: ProdutoItemType = { produto: produto, quantidade: Number(quantidade) }
                console.log(item)
                props.handleInsert(item)

                setProduto(null)
                setShowModalInsert(false)
                setQuantidade(1)
              }}
            >
              Adicionar
            </Button>
          </Box>
        </Box>
      </DraggableDialog>
    </DraggableDialog>
    */
