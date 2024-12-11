import { useVueFlow } from '@vue-flow/core';

export const useNodeStore = defineStore('NodeStore', () => {
  const { nodes, edges, setEdges, setNodes, removeNodes } = useVueFlow();

  const selectedNodeIndex = ref(-1);

  const isNewNodeShow = ref(false);

  const selectedNode = computed(() => {
    return selectedNodeIndex.value!==-1?nodes.value[selectedNodeIndex.value]:null;
  });
  const removeNode = (id: string) => {
    removeNodes([id]);
    selectedNodeIndex.value = -1;
  };

  const updateNodeData = (id: string, type: string, data: NodeData) => {
    const targetNode = nodes.value.find((node) => node.id === id);

    if (targetNode) {
      if (targetNode.data.isEditable) {
        selectedNodeIndex.value = -1;
      }
      targetNode.label = data.label;
      targetNode.type = type;
      targetNode.data = { ...data, isNew: false, isEditable: false };
      isNewNodeShow.value = false;
    }
  };

  const addNewNode = (source: string) => {
    if (isNewNodeShow.value) {
      alert('already new node added , close it and then add new one');
      return;
    }
    const sourceNode = nodes.value.find((node) => node.id === source);

    if (sourceNode) {
      const sourceNodePosition = sourceNode.computedPosition;
      const newId = (nodes.value.length + 1).toString();

      const targetPosition = {
        x: sourceNodePosition.x,
        y: sourceNodePosition.y + 200,
      };

      setNodes([
        ...nodes.value,
        {
          id: newId,
          type: 'addComment',
          label: '',
          data: { description: '', isNew: true },
          position: targetPosition,
        },
      ]);

      setEdges([
        ...edges.value,
        {
          id: 'e1-' + nodes.value.length.toString(),
          source,
          target: newId,
          type: 'custom',
        },
      ]);

      isNewNodeShow.value = true;
    }
  };

  const toggleEdit = (nodeId: string) => {

    const targetNodeIndex = nodes.value.findIndex((node) => node.id === nodeId);
    if (targetNodeIndex != -1) {
      const isEditable = !!nodes.value[targetNodeIndex].data.isEditable;
      nodes.value[targetNodeIndex].data.isEditable = !isEditable;
      
      if (selectedNodeIndex.value > -1) {
        nodes.value[selectedNodeIndex.value].data.isEditable = false;
      }
  
      if (!nodes.value[targetNodeIndex].data.isEditable) {
        selectedNodeIndex.value = -1;
      } else {
        selectedNodeIndex.value = targetNodeIndex;
      }
    }
  };

  const getFlowChartData = () => {
    const { nodes, edges } = transformToVueFlow();

    return { nodes, edges };
  };

  return {
    getFlowChartData,
    addNewNode,
    updateNodeData,
    removeNode,
    toggleEdit,
    selectedNode,
  };
});
