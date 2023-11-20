import { Box, Button, Modal, Typography } from '@mui/material'
import { FrontToDb } from '@renderer/lib/convertMoney'
import { NumericFormatCustom } from '@renderer/lib/masks'
import { useStockStore } from '@renderer/store/stockStore'
import { useEffect, useState } from 'react'
import StyledTextField from '../StyledTextField'

function ProdutoModal(props: { handleClose: () => void; show: boolean }): JSX.Element {
  const [newItem, setNewItem] = useState(false)
  const { editarProdutoItem } = useStockStore()

  const [codigoOriginal, setCodigoOriginal] = useState('')
  const [codigoOriginalError, setCodigoOriginalError] = useState('')
  const [precoVenda, setPrecoVenda] = useState(0)
  const [precoVendaError, setPrecoVendaError] = useState('')
  const [descricao, setDescricao] = useState('')
  const [descricaoError, setDescricaoError] = useState('')
  const [marca, setMarca] = useState('')
  const [marcaError, setMarcaError] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [tamanhoError, setTamanhoError] = useState('')
  const [cor, setCor] = useState('')
  const [corError, setCorError] = useState('')
  const [local, setLocal] = useState('')

  useEffect(() => {
    if (editarProdutoItem) {
      editarProdutoItem.codigoOriginal && setCodigoOriginal(editarProdutoItem.codigoOriginal)
      editarProdutoItem.precoVenda && setPrecoVenda(editarProdutoItem.precoVenda / 100)
      editarProdutoItem.descricao && setDescricao(editarProdutoItem.descricao)
      editarProdutoItem.marca && setMarca(editarProdutoItem.marca)
      editarProdutoItem.tamanho && setTamanho(editarProdutoItem.tamanho)
      editarProdutoItem.cor && setCor(editarProdutoItem.cor)
      editarProdutoItem.local && setLocal(editarProdutoItem.local)
      setNewItem(false)
    } else {
      setNewItem(true)
    }
  }, [])

  function validateForm(): boolean {
    let isValid = true
    if (codigoOriginal === '') {
      setCodigoOriginalError('Preencha o campo')
      isValid = false
    } else if (codigoOriginal.length < 5) {
      setCodigoOriginalError('O campo deve ter pelo menos 3 caracteres')
      isValid = false
    } else {
      setCodigoOriginalError('')
    }

    if (precoVenda === 0) {
      setPrecoVendaError('Preencha o campo')
      isValid = false
    } else {
      setPrecoVendaError('')
    }

    if (descricao === '') {
      setDescricaoError('Preencha o campo')
      isValid = false
    } else {
      setDescricaoError('')
    }

    if (marca === '') {
      setMarcaError('Preencha o campo')
      isValid = false
    } else {
      setMarcaError('')
    }

    if (tamanho === '') {
      setTamanhoError('Preencha o campo')
      isValid = false
    } else {
      setTamanhoError('')
    }
    if (cor === '') {
      setCorError('Preencha o campo')
      isValid = false
    } else {
      setCorError('')
    }

    return isValid
  }
  async function handleSubmit(): Promise<void> {
    if (validateForm() && newItem) {
      await window.api.prisma.produto.create({
        data: {
          codigoOriginal: codigoOriginal,
          precoVenda: FrontToDb(precoVenda),
          descricao: descricao,
          marca: marca,
          tamanho: tamanho,
          cor: cor,
          local: local,
        },
      })
      props.handleClose()
    } else if (validateForm() && !newItem) {
      await window.api.prisma.produto.update({
        where: {
          id: editarProdutoItem?.id,
        },
        data: {
          codigoOriginal: codigoOriginal,
          precoVenda: FrontToDb(precoVenda),
          descricao: descricao,
          marca: marca,
          tamanho: tamanho,
          cor: cor,
          local: local,
        },
      })
      props.handleClose()
    }
  }

  return (
    <Modal
      open={props.show}
      onClose={props.handleClose}
      aria-labelledby="modal-product-title"
      aria-describedby="modal-product-description"
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          border: '1px solid #000',
          borderRadius: '10px',
          p: 4,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Typography id="modal-product-title" variant="h5" fontWeight={'bold'}>
          {!editarProdutoItem ? 'Novo Produto' : 'Editar Produto'}
        </Typography>
        <Box
          display={'flex'}
          flexDirection={'column'}
          id="modal-product-description"
          alignItems={'center'}
          justifyContent={'center'}
          gap={2}
        >
          <Box
            id="modal-product-description"
            component="form"
            noValidate
            display={'flex'}
            gap={1}
            flexWrap={'wrap'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <StyledTextField
              id="codigoOriginal"
              label="Codigo Original"
              variant="filled"
              sx={{ width: '49%' }}
              onChange={(e): void => setCodigoOriginal(e.target.value.toLocaleUpperCase())}
              value={codigoOriginal}
              error={codigoOriginalError !== ''}
              helperText={codigoOriginalError}
            />
            <StyledTextField
              id="precoVenda"
              label="Valor"
              variant="filled"
              sx={{ width: '49%' }}
              onChange={(e): void => setPrecoVenda(e.target.value as unknown as number)}
              value={precoVenda}
              error={precoVendaError !== ''}
              InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                inputComponent: NumericFormatCustom as any,
              }}
              helperText={precoVendaError}
            />
            <StyledTextField
              id="descricao"
              label="Descricão"
              variant="filled"
              sx={{ width: '100%' }}
              onChange={(e): void => setDescricao(e.target.value.toLocaleUpperCase())}
              value={descricao}
              error={descricaoError !== ''}
              helperText={descricaoError}
            />
            <StyledTextField
              id="marca"
              label="Marca"
              variant="filled"
              sx={{ width: '49%' }}
              onChange={(e): void => setMarca(e.target.value.toLocaleUpperCase())}
              value={marca}
              error={marcaError !== ''}
              helperText={marcaError}
            />
            <StyledTextField
              id="tamanho"
              label="Tamanho"
              variant="filled"
              sx={{ width: '49%' }}
              onChange={(e): void => setTamanho(e.target.value.toLocaleUpperCase())}
              value={tamanho}
              error={tamanhoError !== ''}
              helperText={tamanhoError}
            />
            <StyledTextField
              id="cor"
              label="Cor"
              variant="filled"
              sx={{ width: '49%' }}
              onChange={(e): void => setCor(e.target.value.toLocaleUpperCase())}
              value={cor}
              error={corError !== ''}
              helperText={corError}
            />
            <StyledTextField
              id="local"
              label="Local"
              variant="filled"
              sx={{ width: '49%' }}
              onChange={(e): void => setLocal(e.target.value.toLocaleUpperCase())}
              value={local}
            />
          </Box>
          <Box display={'flex'} gap={1}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={(): void => {
                props.handleClose()
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="secondary" onClick={handleSubmit}>
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProdutoModal
