import MessengerIcon from '@/assets/messenger.png'

const Messenger = () => {
  return (
    <a
      href='https://www.facebook.com/profile.php?id=61573923736559'
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-24 right-5 rounded-full shadow-lg'
    >
      <img src={MessengerIcon} className='h-14' />
    </a>
  )
}

export default Messenger
