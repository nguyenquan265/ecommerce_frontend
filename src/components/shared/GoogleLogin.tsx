import { useNavigate } from 'react-router-dom'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/firebase'

import { Button } from '@/components/ui/button'

import { useGoogleLogin } from '@/apis/userApi'

const provider = new GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

interface GoogleLoginProps {
  isParentLoading: boolean
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ isParentLoading }) => {
  const { googleLogin, isPending } = useGoogleLogin()
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)

      if (result) {
        const user = result.user

        if (user) {
          const data = {
            name: user.displayName || '',
            email: user.email || '',
            photoUrl: user.photoURL || ''
          }

          await googleLogin(data)

          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      type='button'
      disabled={isParentLoading || isPending}
      variant='outline'
      className='w-full'
      onClick={handleGoogleLogin}
    >
      <img width={24} height={24} src='https://img.icons8.com/color/48/google-logo.png' alt='google-logo' />
      Google
    </Button>
  )
}

export default GoogleLogin
