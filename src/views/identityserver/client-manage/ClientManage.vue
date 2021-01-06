<template>
  <BasicTable
    title="客户端管理"
    titleHelpMessage="管理连接到服务器上的客户端"
    :column="columns"
  >
  </BasicTable>
</template>
<script>
import { setup } from 'mockjs';
import { defineComponent, ref } from 'vue';
import { BasicTable } from '/@/components/Table';
import { getTestColumns } from './cm';
export default defineComponent({
  name: 'ClientManage',
  components: {
    BasicTable,
  },
  setup() {
    const columns = getTestColumns();

    return {
      columns,
    };
  },
});
</script>
