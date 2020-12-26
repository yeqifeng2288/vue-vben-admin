<template>
  <h1> 登陆中......</h1>
</template>

<script>
import { defineComponent, inject } from 'vue';
import { OpenIdConnectService } from '/@/oidc/openIdConnectService';
import { useRouter } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import { RoleEnum } from '/@/enums/roleEnum';

export default defineComponent({
  name: 'SigninOidc',
  components: {},
  setup() {
    console.log('SigninOidc');
    const oidcServer = new OpenIdConnectService();
    const router = useRouter();
    oidcServer.userLoaded$.subscribe((userLoaded) => {
      if (userLoaded) {
        router.push(PageEnum.BASE_HOME);
      } else {
        console.log('error login 登录未完成');
        router.push(PageEnum.BASE_LOGIN);
      }
    });

    oidcServer.handleCallBack();
    return {};
  },
});
</script>
