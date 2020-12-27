<template>
  <h1>
    <me>ids[admin 1q2w3E*] mock[vben 123456]</me>跳转中......
  </h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { OpenIdConnectService } from '/@/modules/sys/login/openIdConnectService';

export default defineComponent({
  name: 'LoginOidc',
  setup() {
    const oidcServer = new OpenIdConnectService();
    oidcServer.triggerSignIn();
    return {};
  },
});
</script>
