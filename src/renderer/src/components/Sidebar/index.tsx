import IconTruckSide from '@renderer/assets/icons/IconTruckSide'
import SideButton from './SideButton'
import './Sidebar.css'
import IconHome from '@renderer/assets/icons/IconHome'
import IconBoxes from '@renderer/assets/icons/IconBoxes'
import IconChart from '@renderer/assets/icons/IconChart'
import IconCart from '@renderer/assets/icons/IconCart'
import IconTeam from '@renderer/assets/icons/IconTeam'

function Sidebar(): JSX.Element {
  return (
    <aside className="sidebar">
      <SideButton title="Principal" icon={<IconHome />} />
      <SideButton title="Relatórios" icon={<IconChart />} />
      <SideButton title="Entrada" icon={<IconTruckSide />} />
      <SideButton title="Venda" icon={<IconCart />} />
      <SideButton title="Revendedores" icon={<IconTeam />} />
      <SideButton title="Estoque" icon={<IconBoxes />} />
    </aside>
  )
}

export default Sidebar
