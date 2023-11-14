import { Box, Typography } from '@mui/material'
import './content.css'

type ContentProps = {
  title?: string
  children?: string | JSX.Element | JSX.Element[]
}

function Content({ children, title }: ContentProps): JSX.Element {
  return (
    <Box flex="flex" flexDirection="row" width="100%" height="100%" paddingX={2}>
      <Typography variant="h2" align="center" fontStyle={'italic'}>
        {title}
      </Typography>
      <div className="main-content">{children}</div>
    </Box>
  )
}

export default Content
