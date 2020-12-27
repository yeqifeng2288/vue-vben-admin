<script lang="ts">
import { defineComponent } from 'vue';
import { OpenIdConnectService } from '/@/modules/sys/login/openIdConnectService';
export default defineComponent({
  setup() {
    var oidcServer = new OpenIdConnectService();
    oidcServer.handleSilentCallback();

    return {};
  },
});
</script>
