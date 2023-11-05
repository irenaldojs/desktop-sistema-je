import ListStock from './ListStock'
import SearchStockBar from './SearchStockBar'

function Estoque(): JSX.Element {
  return (
    <div>
      Estoque
      <hr />
      <SearchStockBar />
      <ListStock />
    </div>
  )
}

export default Estoque
