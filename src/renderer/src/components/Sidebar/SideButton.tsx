type SideButtonProps = {
  icon: JSX.Element
  title: string
  select?: boolean
}

function SideButton({ icon, title, select }: SideButtonProps): JSX.Element {
  return (
    <button className={`btn-sidebar btn-secondary ${select && 'active'}`}>
      {icon}
      <span> {title} </span>
    </button>
  )
}

export default SideButton
