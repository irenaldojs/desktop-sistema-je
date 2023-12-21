import { Modal, Paper, Typography } from '@mui/material'
import React from 'react'
import { ReactNode, createRef, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'

interface DraggableModalProps {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  title: string
  handleSelector: string
}
/*
export default class DraggableModal extends React.Component<DraggableModalProps> {
  divRef = useRef(null)

  componentDidMount(): void {
    const input: HTMLDivElement | null = this.divRef.current
    if (input !== null) input.select()
  }

  render(): ReactNode {
    return (
      <Modal ref={this.divRef} open={props.open} onClose={props.onClose}>
        <Draggable handle={`#${props.handleSelector}`} cancel={'[class*="MuiDialogContent-root"]'}>
          <Paper style={{ outline: 'none' }}>
            <Typography id={props.handleSelector} sx={{ cursor: 'move' }} align="center">
              {props.title}
            </Typography>
            {props.children}
          </Paper>
        </Draggable>
      </Modal>
    )
  }
}
*/
export default function DraggableModal(props: DraggableModalProps): JSX.Element {
  const inputRef = useRef(null)

  useEffect((): void => {
    const input: HTMLInputElement | null = inputRef.current
    if (input) input.select()
  }, [])

  return (
    <Draggable
      ref={inputRef}
      handle={`#${props.handleSelector}`}
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Modal open={props.open} onClose={props.onClose}>
        <Paper style={{ outline: 'none' }}>
          <Typography id={props.handleSelector} sx={{ cursor: 'move' }} align="center">
            {props.title}
          </Typography>
          {props.children}
        </Paper>
      </Modal>
    </Draggable>
  )
}
