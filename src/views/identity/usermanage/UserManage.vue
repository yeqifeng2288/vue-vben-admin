<template>
  <BasicTable
    title="用户管理"
    titleHelpMessage="管理用户信息"
    :columns="columns"
    :dataSource="data"
    :canResize="canResize"
    :loading="loading"
    :striped="striped"
    :bordered="border"
    showTableSetting
    :pagination="pagination"
  > <template #toolbar>
      <a-button
        type="primary"
        @click="toggleCanResize"
      >
        {{ !canResize ? '自适应高度' : '取消自适应' }}
      </a-button>
      <a-button
        type="primary"
        @click="toggleBorder"
      >
        {{ !border ? '显示边框' : '隐藏边框' }}
      </a-button>
      <a-button
        type="primary"
        @click="toggleLoading"
      > 开启loading </a-button>
      <a-button
        type="primary"
        @click="toggleStriped"
      >
        {{ !striped ? '显示斑马纹' : '隐藏斑马纹' }}
      </a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicTable } from '/@/components/Table';
import { getUserManageColumns } from './usertable';
import { getAllUserData } from './userData';

export default defineComponent({
  name: 'UserManage',
  components: { BasicTable },
  setup() {
    const data = ref([]);
    const columns = getUserManageColumns();
    const canResize = ref(false);
    const loading = ref(true);
    const striped = ref(true);
    const border = ref(true);
    const pagination = ref<any>({ pageSize: 20 });
    getAllUserData().then((dt) => {
      data.value = dt;
      loading.value = false;
    });

    function toggleCanResize() {
      canResize.value = !canResize.value;
    }
    function toggleStriped() {
      striped.value = !striped.value;
    }
    function toggleLoading() {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        pagination.value = { pageSize: 20 };
      }, 3000);
    }
    function toggleBorder() {
      border.value = !border.value;
    }
    return {
      columns,
      data,
      canResize,
      loading,
      striped,
      border,
      pagination,
      toggleCanResize,
      toggleStriped,
      toggleLoading,
      toggleBorder,
    };
  },
});
</script>
