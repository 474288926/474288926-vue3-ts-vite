import NumFactoryStateTypes from './modules/NumFactory/types'
import PermissionStateTypes from './modules/permission/types'
import UserStateTypes from './modules/user/types'

export default interface RootStateTypes {
  permissionModule: any
  permission: any
  text: string
}

export interface AllStateTypes extends RootStateTypes {
  numFactoryModule: NumFactoryStateTypes
  permissionModule: PermissionStateTypes
  userModule: UserStateTypes
}
