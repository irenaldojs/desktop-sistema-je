import './Content.css'

type ContentProps = {
  children?: string | JSX.Element | JSX.Element[]
}

function Content({ children }: ContentProps): JSX.Element {
  return (
    <div className="content">
      <div className="main-content">{children}</div>
    </div>
  )
}

export default Content
