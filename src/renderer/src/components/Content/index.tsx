import './content.css'

type ContentProps = {
  title?: string
  children?: string | JSX.Element | JSX.Element[]
}

function Content({ children, title }: ContentProps): JSX.Element {
  return (
    <div className="content">
      <div className="main-title">{title}</div>
      <div className="main-content">{children}</div>
    </div>
  )
}

export default Content
