import { User, UserManager } from 'oidc-client';
import { oidcEnvironment } from '../environment/oidcEnvironment';

export class OpenIdConnectService {
  private userManager = new UserManager(oidcEnvironment);
  private currentUser: User | null;

  public userLoaded: boolean;
  // userLoaded$ = new ReplaySubject<boolean>(1);
  get UserAvaliable(): boolean {
    return this.currentUser !== null;
  }

  get user(): User | null {
    return this.currentUser;
  }

  triggerSignIn() {
    this.userManager.signinRedirect().then(() => {
      console.log('triggerSignIn');
    });
  }

  // 登录后重定向。
  handleCallBack() {
    this.userManager.signinRedirectCallback().then((user) => {
      console.log('handleCallBack');
      this.currentUser = user;
    });
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
    // 构造函数，每次重启都清理cookie信息。
    this.userManager.clearStaleState();
    this.userLoaded = false;
    this.currentUser = null;
    this.userManager
      .getUser()
      .then((user) => {
        if (user) {
          this.currentUser = user;
          this.userLoaded = true;
        } else {
          this.userLoaded = false;
        }
      })
      .catch((err) => {
        this.currentUser = null;
        console.log(err);
      });

    // 给订阅用户的组件添加一个通知。
    this.userManager.events.addUserLoaded((user) => {
      console.log(user);
      this.currentUser = user;
      this.userLoaded = true;
    });

    this.userManager.events.addUserUnloaded(() => {
      console.log('user unload');
      this.currentUser = null;
      this.userLoaded = false;
    });
  }
}
