import { useParams } from 'react-router-dom'

import UserForm from '@/components/forms/admin/UserForm'
import SingleUserSkeleton from '@/components/skeletons/admin/SingleUserSkeleton'

import { useGetUser } from '@/apis/userApi'

const SingleUser = () => {
  const { userId } = useParams()
  const { user, isLoading } = useGetUser(userId)

  if (isLoading) {
    return <SingleUserSkeleton />
  }

  if (userId !== 'new' && !user) {
    return <div>Không tìm thấy người dùng!</div>
  }

  return (
    <div className='space-y-4'>
      <UserForm initialData={user} />
    </div>
  )
}

export default SingleUser
