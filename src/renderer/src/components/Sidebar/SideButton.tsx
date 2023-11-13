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
      width="100%"
      height="60px"
      paddingBottom="15px"
      className={`btn-sidebar ` + (tab === title ? 'active' : '')}
      onClick={(): void => changeTab(title)}
      sx={{ cursor: 'pointer' }}
    >
      {icon}
      <Typography variant="caption" position="absolute" bottom="4px">
        {title}
      </Typography>
    </Box>
  )
}

export default SideButton
