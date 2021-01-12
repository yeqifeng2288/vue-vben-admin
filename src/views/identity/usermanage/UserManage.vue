<template>
  <BasicTable
    title="用户管理"
    titleHelpMessage="管理用户信息"
    @register="registerTable"
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
    <template #action="{ record, column }">
      <TableAction
        :actions="createBaseActions(record, column)"
        :dropDownActions="createActions(record, column)"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  BasicTable,
  useTable,
  TableAction,
  BasicColumn,
  ActionItem,
  EditTableHeaderIcon,
  EditRecordRow,
} from '/@/components/Table';

import { getUserManageColumns } from './usertable';
import { getAllUserData } from './userData';

export default defineComponent({
  name: 'UserManage',
  components: { BasicTable, EditTableHeaderIcon, TableAction },
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

    const currentEditKeyRef = ref('');
    function handleEdit(record: EditRecordRow) {
      console.log('啊你点击了');
      currentEditKeyRef.value = record.key;
      record.onEdit?.(true);
    }

    function handleCancel(record: EditRecordRow) {
      currentEditKeyRef.value = '';
      record.onEdit?.(false, true);
    }

    async function handleSave(record: EditRecordRow) {
      const pass = await record.onEdit?.(false, true);
      if (pass) {
        currentEditKeyRef.value = '';
      }
    }

    const [registerTable] = useTable({
      title: '可编辑行示例',
      // api: demoListApi,
      columns: columns,
      showIndexColumn: false,
      actionColumn: {
        width: 160,
        title: '操作',
        dataIndex: 'action',
        slots: { customRender: 'action' },
      },
    });

    function createBaseActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
      console.log(column.title);
      return [
        {
          label: '编辑',
          disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
          onClick: handleEdit.bind(null, record),
        },
      ];
    }

    function createActions(record: EditRecordRow, column: BasicColumn): ActionItem[] {
      // if (!record.editable) {
      //   return [
      //     {
      //       label: '编辑',
      //       disabled: currentEditKeyRef.value ? currentEditKeyRef.value !== record.key : false,
      //       onClick: handleEdit.bind(null, record),
      //     },
      //   ];
      // }

      return [
        {
          label: '保存',
          onClick: handleSave.bind(null, record, column),
        },
        {
          label: '取消',
          popConfirm: {
            title: '是否取消编辑',
            confirm: handleCancel.bind(null, record, column),
          },
        },
      ];
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
      createActions,
      createBaseActions,
      registerTable,
    };
  },
});
</script>
