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
interface Window  {
  tagList:Tag[]
}

type TagListModel = {
  data: Tag[],
  fetch: () => Tag[],
  create: (name: string) => string, //'success'||'duplicated' //联合类型
  save: () => void,
  update: (id: string, name: string) => string,
  remove: (id: string) => boolean,
}

