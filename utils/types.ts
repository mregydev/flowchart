export type NodeType = 'addComment' | 'dateTime' | 'sendMessage' | 'trigger';


export interface NodeData {
  label: string;
  description: string;
  isNew?:boolean
  isEditable?:boolean
}


export interface FormField {
  value:string,
  hasError: boolean
}


export interface CustomNode {
  id: string,
  type: NodeType
  label: string,
  data: {
      description: string,
      isNew: boolean,
      isEditable: boolean,
      nodeId: string
  }
}
