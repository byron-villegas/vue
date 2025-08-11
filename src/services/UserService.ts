import type { User } from '@/models/User'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()

export function getUsers(): User[] {
    return userStore.getUsers()
}

export function addUser(user: User): void {
  userStore.addUser(user)
}