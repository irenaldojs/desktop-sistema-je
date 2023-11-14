import { Box } from '@mui/material'
import { useListStock } from '@renderer/store/listStockStore'
import { useEffect, useRef, useState } from 'react'
import { SearchRounded } from '@mui/icons-material'

function SearchStockBar(): JSX.Element {
  const inputRef = useRef(null)
  const [requisito, setRequisito] = useState('')
  const [tipoBusca, buscarDescricao, buscarCodigo, mudarBusca] = useListStock((state) => [
    state.busca,
    state.buscarDescricao,
    state.buscarCodigo,
    state.mudarBusca,
  ])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F9') {
        mudarBusca('Código')
        setRequisito('')
        if (inputRef && inputRef.current) (inputRef.current as HTMLInputElement).focus()
      }
      if (e.key === 'F10') {
        mudarBusca('Descricão')
        setRequisito('')
        if (inputRef && inputRef.current) (inputRef.current as HTMLInputElement).focus()
      }
    })
    console.log('chamando')
  }, [])

  function handleSubmit(): void {
    if (tipoBusca === 'Código') buscarCodigo(requisito)
    if (tipoBusca === 'Descricão') buscarDescricao(requisito)
  }

  return (
    <Box display="flex" flexDirection="column" width={'50%'} position={'relative'}>
      <SearchRounded fontSize="medium" sx={{ position: 'absolute', bottom: '5px', left: '5px' }} />
      <label className="label-input-search">{tipoBusca}</label>
      <input
        ref={inputRef}
        className="input-search"
        value={requisito}
        onChange={(e): void => setRequisito(e.target.value.toLocaleUpperCase())}
        onKeyDown={(e): void => {
          e.key === 'Enter' && handleSubmit()
        }}
        type="text"
        placeholder="F9 - Código | F10 - Descricão"
      />
    </Box>
  )
}

export default SearchStockBar

/*

<FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Código"
            control={<Radio />}
            label="F9 - Código"
            checked={tipoBusca === 'Código'}
          />
          <FormControlLabel
            value="Descricão"
            control={<Radio />}
            label="F10 - Descricão"
            checked={tipoBusca === 'Descricão'}
          />
        </RadioGroup>
      </FormControl>
*/