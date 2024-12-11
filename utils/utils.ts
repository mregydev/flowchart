import type { Edge, Node } from '@vue-flow/core';
import {nodes,edges} from '../data.json'

interface Result  {
  nodes: Node[];
  edges: Edge[];
};

export function transformToVueFlow(): Result {
  return { nodes, edges };
}

export function getFormRules() {
  const rules = [(value: string) => !!value || 'This field is required.'];
  return rules;
}
