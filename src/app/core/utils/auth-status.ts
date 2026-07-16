import { AuthorizationStatus } from '../constants/const';

export function isAuth(authStatus: AuthorizationStatus) {
  return authStatus === AuthorizationStatus.AUTH;
}
