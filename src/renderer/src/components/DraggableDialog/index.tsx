/* eslint-disable react/display-name */
import React from 'react'
import { Dialog, DialogTitle, Paper, PaperProps } from '@mui/material'
import Draggable from 'react-draggable'

interface DraggableDialogProps {
  open: boolean
  onClose: () => void
  handleSelector: string
  title: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  children?: React.ReactNode
}

function DraggableDialog(props: DraggableDialogProps): JSX.Element {
  const { open, onClose, handleSelector, title, maxWidth, children } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={handleSelector}
      PaperComponent={PaperComponent(handleSelector) as unknown as React.ComponentType<unknown>}
      fullWidth
      maxWidth={maxWidth ?? 'sm'}
    >
      <DialogTitle id={handleSelector} sx={{ cursor: 'move' }} align="center">
        {title}
      </DialogTitle>
      {children}
    </Dialog>
  )
}

function PaperComponent(handleSelector: string): unknown {
  return (props: PaperProps): JSX.Element => (
    <Draggable handle={`#${handleSelector}`} cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} sx={{ backgroundColor: 'background.default' }} />
    </Draggable>
  )
}

export default DraggableDialog
