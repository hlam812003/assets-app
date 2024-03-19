import auth from '../server/services/auth.services';

export interface UserInfo {
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
};

export const useUserStore = defineStore('user', {
    state: () => ({
      userInfo: null as UserInfo | null,
      isLoggedIn: false
    }),
    actions: {
      async loginUser(username: string, password: string) {
        try {
          const userData = await auth.login({ username, password });
          this.setUser(userData);
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
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