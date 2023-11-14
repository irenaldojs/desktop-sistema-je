import { Box, Typography } from '@mui/material'
import { TabType, useSidebar } from '@renderer/store/sidebarStore'

type SideButtonProps = {
  icon: JSX.Element
  title: TabType
}

function SideButton({ icon, title }: SideButtonProps): JSX.Element {
  const [tab, changeTab] = useSidebar((state) => [state.tab, state.changeTab])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      width="65px"
      height="65px"
      paddingBottom="20px"
      className={`btn-sidebar ` + (tab === title ? 'active' : '')}
      onClick={(): void => changeTab(title)}
      sx={{ cursor: 'pointer' }}
    >
      {icon}
      <Typography position="absolute" bottom="3px" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Box>
  )
}

export default SideButton
