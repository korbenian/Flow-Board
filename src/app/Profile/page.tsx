import ProfileUser from '../pages/Profile/Profile'
import { Profile } from '../components/context/TaskContext'
export default function ProfilePage ({ user }: { user: Profile }) {
  return <ProfileUser user={user} />
}
