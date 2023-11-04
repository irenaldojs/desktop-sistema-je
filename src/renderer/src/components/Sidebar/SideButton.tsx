import { TabType, useSidebar } from '@renderer/store/SideBarStore'

type SideButtonProps = {
  icon: JSX.Element
  title: TabType
}

function SideButton({ icon, title }: SideButtonProps): JSX.Element {
  const [tab, changeTab] = useSidebar((state) => [state.tab, state.changeTab])

  return (
    <button
      className={`btn-sidebar btn-secondary ${tab == title && 'active'}`}
      onClick={(): void => changeTab(title)}
    >
      {icon}
      <span> {title} </span>
    </button>
  )
}

export default SideButton
