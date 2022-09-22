type Tag = {
  name: string,
  value:string,
}
type RecordItem = {
  id?: number,
  tags: Tag;
  notes: string;
  type: string;
  amount: number;//数据类型
  createdDate?: Date | string;//类/构造函数
}
type RootState = {
  recordList: RecordItem[],
  createRecordError:Error | null,
  createTagError:Error | null,
  tagList: Tag[],
  currentTag?: Tag,
}

//自定义全局声明
// interface Window {
// }