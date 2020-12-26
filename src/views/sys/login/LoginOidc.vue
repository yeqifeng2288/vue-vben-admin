<template>
  <h1>Signin跳转中......</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { OpenIdConnectService } from '/@/oidc/openIdConnectService';

export default defineComponent({
  name: 'LoginOidc',
  setup() {
    const oidcServer = new OpenIdConnectService();
    oidcServer.triggerSignIn();
    return {};
  },
});
</script>
