import { Box, Button, Modal, Typography } from '@mui/material'
import StyledTextField from '@renderer/components/StyledTextField'
import { useSuplierStore } from '@renderer/store/suplierStore'
import { useEffect, useState } from 'react'

function ModalFormularioFornecedores(props: {
  handleClose: () => void
  show: boolean
}): JSX.Element {
  const [newItem, setNewItem] = useState(false)
  const { editarFornecedor } = useSuplierStore()

  const [nome, setNome] = useState('')
  const [nomeError, setNomeError] = useState('')
  const [telefone, setTelefone] = useState('')
  const [telefoneError, setTelefoneError] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  useEffect(() => {
    if (editarFornecedor) {
      editarFornecedor.nome && setNome(editarFornecedor.nome)
      editarFornecedor.telefone && setTelefone(editarFornecedor.telefone)
      editarFornecedor.endereco.rua && setRua(editarFornecedor.endereco.rua)
      editarFornecedor.endereco.numero && setNumero(editarFornecedor.endereco.numero)
      editarFornecedor.endereco.bairro && setBairro(editarFornecedor.endereco.bairro)
      editarFornecedor.endereco.cidade && setCidade(editarFornecedor.endereco.cidade)
      editarFornecedor.endereco.estado && setEstado(editarFornecedor.endereco.estado)

      setNewItem(false)
    } else {
      setNome('')
      setTelefone('')
      setRua('')
      setNumero('')
      setBairro('')
      setCidade('')
      setEstado('')
      setNewItem(true)
    }
  }, [editarFornecedor])

  function validateForm(): boolean {
    let isValid = true
    if (nome === '') {
      setNomeError('Preencha o campo')
      isValid = false
    } else {
      setNomeError('')
    }
    if (telefone === '') {
      setTelefoneError('Preencha o campo')
      isValid = false
    } else {
      setTelefoneError('')
    }

    return isValid
  }

  async function handleSubmit(): Promise<void> {
    if (validateForm() && newItem) {
      await window.api.prisma.fornecedor.create({
        data: {
          nome: nome,
          telefone: telefone,
          endereco: {
            create: {
              rua: rua,
              numero: numero,
              bairro: bairro,
              cidade: cidade,
              estado: estado,
            },
          },
        },
      })
    } else if (validateForm() && !newItem) {
      await window.api.prisma.fornecedor.update({
        where: {
          id: editarFornecedor?.id,
        },
        data: {
          nome: nome,
          telefone: telefone,
          endereco: {
            update: {
              rua: rua,
              numero: numero,
              bairro: bairro,
              cidade: cidade,
              estado: estado,
            },
          },
        },
      })
    }

    props.handleClose()
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
          border: '1px solid #000',
          borderRadius: '10px',
          width: 800,
          p: 4,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Typography id="modal-product-title" variant="h5" fontWeight={'bold'}>
          {!editarFornecedor ? 'Novo Fornecedor' : 'Editar Fornecedor'}
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
              id="nome"
              label="Nome"
              variant="filled"
              sx={{ width: '69%' }}
              onChange={(e): void => setNome(e.target.value.toLocaleUpperCase())}
              value={nome}
              error={nomeError !== ''}
              helperText={nomeError}
            />
            <StyledTextField
              id="telefone"
              label="Telefone"
              variant="filled"
              sx={{ width: '29%' }}
              onChange={(e): void => setTelefone(e.target.value.toLocaleUpperCase())}
              value={telefone}
              error={telefoneError !== ''}
              helperText={telefoneError}
            />
            <StyledTextField
              id="rua"
              label="Rua"
              variant="filled"
              sx={{ width: '69%' }}
              onChange={(e): void => setRua(e.target.value.toLocaleUpperCase())}
              value={rua}
            />
            <StyledTextField
              id="numero"
              label="Numero"
              variant="filled"
              sx={{ width: '29%' }}
              onChange={(e): void => setNumero(e.target.value.toLocaleUpperCase())}
              value={numero}
            />
            <StyledTextField
              id="bairro"
              label="Bairro"
              variant="filled"
              sx={{ width: '32%' }}
              onChange={(e): void => setBairro(e.target.value.toLocaleUpperCase())}
              value={bairro}
            />
            <StyledTextField
              id="cidade"
              label="Cidade"
              variant="filled"
              sx={{ width: '32%' }}
              onChange={(e): void => setCidade(e.target.value.toLocaleUpperCase())}
              value={cidade}
            />
            <StyledTextField
              id="estado"
              label="Estado"
              variant="filled"
              sx={{ width: '32%' }}
              onChange={(e): void => setEstado(e.target.value.toLocaleUpperCase())}
              value={estado}
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
              {!editarFornecedor ? 'Cadastrar' : 'Salvar'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalFormularioFornecedores
