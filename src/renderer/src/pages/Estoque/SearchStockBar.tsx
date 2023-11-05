import { useListStock } from '@renderer/store/listStockStore'
import { useState } from 'react'

function SearchStockBar(): JSX.Element {
  const [busca, setBusca] = useState('')
  const buscarDescricao = useListStock((state) => state.buscarDescricao)

  function handleSubmit(): void {
    buscarDescricao(busca)
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar"
        value={busca}
        onChange={(e): void => setBusca(e.target.value)}
        onKeyDown={(e): void => {
          e.key === 'Enter' && handleSubmit()
        }}
      />
    </div>
  )
}

export default SearchStockBar
