import type { User } from '@/models/User'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[]
  }),
  actions: {
    getUsers() {
      this.users.push({
        rut: '11111111-1',
        nombres: 'Juan Carlos',
        apellidos: 'Bodoque Triviño',
        fechaNacimiento: '1996-06-22',
        edad: 29,
        sexo: 'M',
        saldo: 100000
      });

      return this.users;
    },
    addUser(user: User) {
      this.users.push(user);
    },
  }
})