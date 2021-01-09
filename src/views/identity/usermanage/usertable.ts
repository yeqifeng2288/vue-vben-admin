import { BasicColumn } from '/@/components/Table/src/types/table';

export function getUserManageColumns(): BasicColumn[] {
  return [
    {
      title: 'Id',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '手机',
      dataIndex: 'phoneNumber',
    },
    {
      title: '创建时间',
      dataIndex: 'creationTime',
    },
  ];
}

export default getUserManageColumns;
