import { IdentityUserDtoPagedResultDto } from './models/identityUserDtoPagedResultDto';
import { userStore } from '/@/store/modules/user';
import { defHttp } from '/@/utils/http/axios';

enum UserManageApi {
  GetAllUrl = '/api/identity/users',
}

/**
 * @description:获取所有用户。
 */
export async function getAllUser() {
  defHttp.configAxios({
    headers: {
      authorization: 'Bearer ' + userStore.getUserAccessToken,
    },
  });

  var result = await defHttp
    .request<IdentityUserDtoPagedResultDto>({
      url: UserManageApi.GetAllUrl,
      method: 'GET',
    })
    .catch((err) => {
      console.error(err);
    });

  return result;
}
