import type {
  LoginParams,
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
} from '/@/api/sys/model/userModel';

import store from '/@/store/index';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

import { PageEnum } from '/@/enums/pageEnum';
import { RoleEnum } from '/@/enums/roleEnum';
import {
  ACCESS_TOKEN,
  CacheTypeEnum,
  OIDC_USER_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '/@/enums/cacheEnum';

import { useMessage } from '/@/hooks/web/useMessage';

import router from '/@/router';
import { loginApi, getUserInfoById } from '/@/api/sys/user';

import { setLocal, getLocal, getSession, setSession, clearAll } from '/@/utils/helper/persistent';
import { useProjectSetting } from '/@/hooks/setting';
import { useI18n } from '/@/hooks/web/useI18n';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
import { OpenIdConnectService } from '/@/modules/sys/login/openIdConnectService';
import Oidc from 'oidc-client';

export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>;

const NAME = 'user';
hotModuleUnregisterModule(NAME);

const { permissionCacheType } = useProjectSetting();

function getCache<T>(key: string) {
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
  return fn(key) as T;
}

function setCache(USER_INFO_KEY: string, info: any) {
  if (!info) return;
  // const fn = permissionCacheType === CacheTypeEnum.LOCAL ? setLocal : setSession;
  setLocal(USER_INFO_KEY, info, true);
  // TODO
  setSession(USER_INFO_KEY, info, true);
}

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {
  // user info
  private userInfoState: UserInfo | null = null;

  private currentUser: Oidc.User | null = null;

  // token
  private tokenState = '';

  private accessToken = '';

  // roleList
  private roleListState: RoleEnum[] = [];

  // accessToken。
  get getUserAccessToken(): string {
    return this.accessToken || getCache<string>(ACCESS_TOKEN);
  }

  get getUserInfoState(): UserInfo {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
  }

  get getTokenState(): string {
    return this.tokenState || getCache<string>(TOKEN_KEY);
  }

  get getRoleListState(): RoleEnum[] {
    return this.roleListState.length > 0 ? this.roleListState : getCache<RoleEnum[]>(ROLES_KEY);
  }

  get getCurrentUser(): Oidc.User {
    return this.currentUser || getCache<Oidc.User>(OIDC_USER_KEY);
  }

  /**
   * @description: 重置登录状态。
   */
  @Mutation
  commitResetState(): void {
    this.userInfoState = null;
    this.tokenState = '';
    this.roleListState = [];
    clearAll();
  }

  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info;
    setCache(USER_INFO_KEY, info);
  }

  @Mutation
  commitCurrentUser(user: Oidc.User) {
    this.currentUser = user;
    setCache(OIDC_USER_KEY, user);
  }

  /**
   *
   * @param accessToken 访问Token
   * @description 设置用户的访问Token。
   */
  @Mutation
  commitUserAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
    console.log('access token was changed');
    setCache(ACCESS_TOKEN, accessToken);
  }

  @Mutation
  commitRoleListState(roleList: RoleEnum[]): void {
    this.roleListState = roleList;
    setCache(ROLES_KEY, roleList);
  }

  @Mutation
  commitTokenState(info: string): void {
    this.tokenState = info;
    setCache(TOKEN_KEY, info);
  }

  /**
   * @description: login
   */
  @Action
  async login(
    params: LoginParams & {
      goHome?: boolean;
      mode?: ErrorMessageMode;
    }
  ): Promise<GetUserInfoByUserIdModel | null> {
    try {
      const { goHome = true, mode, ...loginParams } = params;
      const data = await loginApi(loginParams, mode);

      const { token, userId } = data;

      // save token
      this.commitTokenState(token);

      // get user info
      const userInfo = await this.getUserInfoAction({ userId });

      // const name = FULL_PAGE_NOT_FOUND_ROUTE.name;
      // name && router.removeRoute(name);
      goHome && (await router.replace(PageEnum.BASE_HOME));
      return userInfo;
    } catch (error) {
      return null;
    }
  }

  @Action
  async getUserInfoAction({ userId }: GetUserInfoByUserIdParams) {
    const userInfo = await getUserInfoById({ userId });
    const { role } = userInfo;
    const roleList = [role?.value] as RoleEnum[];
    this.commitUserInfoState(userInfo);
    this.commitRoleListState(roleList);
    return userInfo;
  }

  /**
   * @description: login out
   */
  @Action
  async loginOut(goLogin = false) {
    userStore.getTokenState;
    this.commitResetState();
    await new OpenIdConnectService().triggerSignOut();
    goLogin && router.push(PageEnum.BASE_HOME);
  }

  /**
   * @description: Confirm before logging out
   */
  @Action
  async confirmLoginOut() {
    const { createConfirm } = useMessage();
    const { t } = useI18n();
    createConfirm({
      iconType: 'warning',
      title: t('sys.app.loginOutTip'),
      content: t('sys.app.loginOutMessage'),
      onOk: async () => {
        await this.loginOut(true);
      },
    });
  }

  /**
   * @description: loginOidc
   */
  @Action
  loginOidc(
    userInfo: GetUserInfoByUserIdModel & {
      goHome?: boolean;
      mode?: ErrorMessageMode;
    }
  ): void {
    try {
      //  将信息直接设置到缓存中。
      const { role } = userInfo;
      const roleList = [role?.value] as RoleEnum[];
      this.commitUserInfoState(userInfo);
      this.commitRoleListState(roleList);
      const userToken = userInfo.userToken;
      if (userToken) this.commitTokenState(userToken);
    } catch (error) {
      console.log(error);
    }
  }
}

export const userStore = getModule<User>(User);
