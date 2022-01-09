import { Module } from 'vuex'
import UserStateTypes from './types'
import RootStateTypes from '../../types'

// Create a new store Modules.
const userModule: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    roles: []
  },
  mutations: {
    SET_ROLES(state: UserStateTypes, role) {
      state.roles.push(role)
    }
  },
  actions: {}
}

export default userModule
