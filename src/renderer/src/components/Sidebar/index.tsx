import SideButton from './SideButton'
import './sidebar.css'
import logoPNG from '@renderer/assets/logo/logo_120.png'
import {
  GroupsRounded,
  HomeRounded,
  LeaderboardRounded,
  LocalShippingRounded,
  ShoppingCartRounded,
  WarehouseRounded,
} from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'

function Sidebar(): JSX.Element {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      bgcolor="var(--secondary-color)"
      color="var(--text-color-light)"
      alignItems="center"
      paddingLeft="3px"
      gap="1px"
    >
      <Avatar
        src={logoPNG}
        variant="circular"
        alt="logo"
        sx={{ width: 60, height: 55, mt: 2, mb: 2, mr: 0.5 }}
      />
      <SideButton title="Principal" icon={<HomeRounded />} />
      <SideButton title="Relatórios" icon={<LeaderboardRounded />} />
      <SideButton title="Entrada" icon={<LocalShippingRounded />} />
      <SideButton title="Vendas" icon={<ShoppingCartRounded />} />
      <SideButton title="Equipe" icon={<GroupsRounded />} />
      <SideButton title="Estoque" icon={<WarehouseRounded />} />
    </Box>
  )
}

export default Sidebar
