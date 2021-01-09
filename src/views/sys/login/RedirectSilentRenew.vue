<template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { OpenIdConnectService } from '/@/modules/sys/login/openIdConnectService';
export default defineComponent({
  setup() {
    let service = new OpenIdConnectService();
    service.handleSilentCallback();
    return {};
  },
});
</script>
