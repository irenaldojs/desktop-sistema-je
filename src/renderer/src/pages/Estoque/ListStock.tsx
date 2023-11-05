import { useListStock } from '@renderer/store/listStockStore'

function ListStock(): JSX.Element {
  const produtos = useListStock((state) => state.produtos)
  return (
    <div>
      {produtos.map((p) => (
        <div key={p.id}>
          <p>{p.descricao}</p>
        </div>
      ))}
    </div>
  )
}

export default ListStock
