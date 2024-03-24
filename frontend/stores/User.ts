import auth from '../services/auth.services';
import type { UserInfo } from 'types/User';

export const useUserStore = defineStore('user', {
    state: () => ({
      userInfo: null as UserInfo | null,
      isLoggedIn: false
    }),
    actions: {
      // rememberMe: boolean
      loginUser(username: string, password: string) {
        return auth.login({ username, password })
          .then((userData) => {
            this.setUser(userData);
            this.isLoggedIn = true;
            return true;
          })
          .catch((error) => {
            console.error('Login failed:', error);
            return false;
          });
      },
      setUser(userInfo: UserInfo) {
        this.userInfo = userInfo;
        this.isLoggedIn = true;
      },
      clearUser() {
        this.userInfo = null;
        this.isLoggedIn = false;
      },
    }
});