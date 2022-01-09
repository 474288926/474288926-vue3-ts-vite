import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import RootStateTypes, { AllStateTypes } from './types'

import numFactoryModule from './modules/NumFactory'
import permissionModule from './modules/permission'
import userModule from './modules/user'

export const store = createStore<RootStateTypes>({
  state: {
    text: 'vue3Config'
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    numFactoryModule,
    permissionModule,
    userModule
  }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key)
}
