import { BasicColumn } from '/@/components/Table/src/types/table';

export function getTestColumns(): BasicColumn[] {
  return [
    {
      title: '客户端Id',
      dataIndex: 'ClientId',
      fixed: 'left',
      width: 200,
    },
  ];
}

export default getTestColumns;
