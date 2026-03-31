import { useContext } from 'react'
import NotificationContext from '../NotificationContext.jsx'

const Notification = ({ type }) => {

  const { notification } = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notification ? 'block' : 'none'
  }
  
  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
