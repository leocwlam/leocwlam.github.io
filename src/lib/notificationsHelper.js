import { store } from 'react-notifications-component'

export function showAlertMessage({type, title, message, width, duration}) {
  store.addNotification ({
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration,
      onScreen: true
    },
    width
  })
}