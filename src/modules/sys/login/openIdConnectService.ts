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
        this.currentUser = user;
        this.userLoaded = true;
        var userInfo = this.buildUserInfo();
        let sub = this.currentUser.profile.sub;
        if (sub) {
          userStore.loginOidc(userInfo);
          console.log('登录成功', sub);
        }
      })
      .catch((err) => {
        console.log(222222222);
        console.log(err);
      });

    console.log('handleCallBack');
  }

  handleSilentCallback() {
    this.userManager.signinSilentCallback().then((user) => {
      if (user) {
        this.currentUser = user;
      }
      console.log('自动刷新token');
    });
  }

  triggerSignOut() {
    this.userManager.signoutRedirect().then((res) => {
      console.log('用户登出');
    });
  }

  constructor() {
    this.currentUser = null;
    this.userLoaded = false;
    this.userManager.clearStaleState();

    this.userManager.events.addUserLoaded(() => {});

    this.userManager
      .getUser()
      .then((user) => {
        if (user) {
          this.currentUser = user;
          this.userLoaded$.next(true);
        } else {
          this.currentUser = null;
          this.userLoaded$.next(false);
        }
      })
      .catch((err) => {
        this.currentUser = null;
        this.userLoaded$.next(false);
      });

    this.userManager.events.addUserLoaded((user) => {
      console.log('user loaded:', user);
      this.currentUser = user;
      this.userLoaded$.next(true);
    });

    this.userManager.events.addUserUnloaded((user: void) => {
      console.log('user unloaded', user);
      this.currentUser = null;
      this.userLoaded$.next(false);
    });
  }
}
