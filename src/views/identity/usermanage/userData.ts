import { getAllUser } from '/@/api/identity/usermanage';

export async function getAllUserData(): Promise<any> {
  let datas = await getAllUser();
  if (datas) {
    let arr: any = [];
    for (let index = 0; index < datas.totalCount; index++) {
      let element = datas.items[index];
      arr.push({
        id: element.id,
        userName: element.userName,
        phoneNumber: element.phoneNumber,
        creationTime: element.creationTime,
      });
    }

    return arr;
  }

  return [];
}
