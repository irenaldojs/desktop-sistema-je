import { Box, Typography } from '@mui/material'
import { TabsType, useNavigationApp } from '@renderer/store/navigatorStore'
import { useNavigate } from 'react-router-dom'

type SideButtonProps = {
  icon: JSX.Element
  title: TabsType
}

function SideButton({ icon, title }: SideButtonProps): JSX.Element {
  const { tabAtual, setTabAtual } = useNavigationApp()
  const navigate = useNavigate()

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
      className={`btn-sidebar ` + (tabAtual === title ? 'active' : '')}
      onClick={(): void => navigate(setTabAtual(title))}
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
