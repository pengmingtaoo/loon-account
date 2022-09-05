type TagItem = {
  name: string;
  value: string;
}
type RecordItem = {
  tag: TagItem;
  notes: string;
  type: string;
  amount: number;//数据类型
  createdAt?: Date;//类/构造函数
}
//自定义全局声明

type TabBarItem = {
  name: string;
  value: string;
}

type storeState={
  tagList: TagItem[];
  recordList: RecordItem[];
  tagListError: ''|'depulicate';   //联合类型；
  currentRecord: RecordItem | undefined;
  recordListError: '' | 'notfound';
}