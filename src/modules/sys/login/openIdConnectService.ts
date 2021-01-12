import { User, UserManager } from 'oidc-client';
import { oidcEnvironment } from '/@/environment/oidcEnvironment';
import { ReplaySubject } from 'rxjs';
import { userStore } from '/@/store/modules/user';
import { GetUserInfoByUserIdModel, RoleInfo } from '/@/api/sys/model/userModel';

export class OpenIdConnectService {
  private userManager = new UserManager(oidcEnvironment);
  private currentUser: User | null;

  public userLoaded: boolean;
  userLoaded$ = new ReplaySubject<boolean>(1);
  get UserAvaliable(): boolean {
    return this.currentUser !== null;
  }

  get user(): User | null {
    return this.currentUser;
  }

  private setUser(user: User | null): User | null {
    this.currentUser = user;
    if (user) {
      console.log('加载用户', user);
      this.userLoaded = true;
      userStore.commitUserAccessToken(user.access_token);
      userStore.commitCurrentUser(user);
    } else {
      this.userLoaded = false;
    }

    return this.currentUser;
  }

  private buildUserInfo(): GetUserInfoByUserIdModel {
    let roles: RoleInfo = {
      roleName: 'super',
      value: 'super',
    };
    let userModel: GetUserInfoByUserIdModel = {
      role: roles,
      username: this.currentUser?.profile.given_name,
      userId: this.currentUser?.profile.sub,
      realName: this.currentUser?.profile.name,
      desc: this.currentUser?.profile.email,
      userToken: this.currentUser?.profile.sub,
    };

    return userModel;
  }

  triggerSignIn() {
    this.userManager.signinRedirect().then(() => {
      console.log('跳转到登录triggerSignIn');
    });
  }

  // 登录后重定向。
  handleCallBack() {
    this.userManager
      .signinRedirectCallback()
      .then((user) => {
        console.log('handleCallBack');
        this.setUser(user);
        var userInfo = this.buildUserInfo();
        let sub = this.setUser(user)?.profile.sub;
        if (sub) {
          userStore.loginOidc(userInfo);
          console.log('登录成功', sub);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('handleCallBack2');
  }

  handleSilentCallback() {
    this.userManager
      .signinSilentCallback()
      .then((user) => {
        console.log('sucessful for renew access token', user);
      })
      .catch((err) => {
        console.log('刷新token错误!', err);
      });
  }

  triggerSignOut() {
    this.userManager.signoutRedirect().then((res) => {
      console.log('用户登出', res);
    });
  }

  constructor() {
    this.currentUser = userStore.getCurrentUser;
    if (this.currentUser) this.userLoaded = true;
    else this.userLoaded = false;

    this.userManager.clearStaleState();

    this.userManager.events.addUserLoaded((user) => {
      this.setUser(user);
      console.log('用户已加载', user);
    });

    this.userManager
      .getUser()
      .then((user) => {
        if (user) {
          this.userLoaded$.next(true);
        } else {
          this.userLoaded$.next(false);
        }
      })
      .catch((err) => {
        console.log(err);
        this.userLoaded$.next(false);
      });

    this.userManager.events.addUserLoaded((user) => {
      console.log('user loaded:', user);
      this.setUser(user);
      this.userLoaded$.next(true);
    });

    this.userManager.events.addUserUnloaded((user: void) => {
      console.log('user unloaded', user);
      this.setUser(null);
      this.userLoaded$.next(false);
    });

    this.userManager.events.addAccessTokenExpired((user) => {
      console.log('User access token expired:', user);
      this.handleSilentCallback();
    });
  }
}
