type Tag = {
  id:string,
  name:string
}
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;//数据类型
  createdDate?: Date|string;//类/构造函数
}
//自定义全局声明

