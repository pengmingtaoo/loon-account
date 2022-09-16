type Tag = {
  id: string,
  name: string
}
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;//数据类型
  createdDate?: Date | string;//类/构造函数
}
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
}

//自定义全局声明
// interface Window {
// }