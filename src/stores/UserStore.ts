import type { User } from '@/models/User'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[]
  }),
  actions: {
    getUsers() {
      return this.users;
    },
    addUser(user: User) {
      this.users.push(user);
    }
  }
})