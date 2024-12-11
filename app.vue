  <script lang="ts" setup>
  import { ref } from 'vue'

  import { VueFlow, useVueFlow, type Node, type Edge } from '@vue-flow/core'
  import CustomNode from './components/CustomNode.vue'
  import type { NodeType } from './utils/types';
  import { useNodeStore } from './store/useNodeStore';
  import CustomEdge from './components/CustomEdge.vue';
  import '@vue-flow/core/dist/style.css';

  const { onNodesChange, onEdgesChange } = useVueFlow()

  const nodeTypes: Record<NodeType, any> = {
    'addComment': CustomNode,
    'dateTime': CustomNode,
    'sendMessage': CustomNode,
    'trigger': CustomNode
  }

  const edgeTypes: Record<string, any> = {
    custom: CustomEdge
  }
  const store = useNodeStore()
  const {getFlowChartData}=store;

  const { selectedNode } = storeToRefs(store)

  const {nodes,edges} =getFlowChartData();

  const isEditorShown=computed(()=>selectedNode.value)
</script>

  <template>
    
    <ClientOnly>
      <div class="container">
        <div class="flow-chart">
          <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" :edge-types="edgeTypes" :default-zoom="1.5"
            :fitView="{ padding: 20 }" :fitViewOptions="{ padding: 0.1 }">

          </VueFlow>
        </div>
        <div class="editor-section">
           <div class="app-title">Flowchart Assignment</div>
          <Editor v-if="isEditorShown"></Editor>
        </div>
      </div>
    </ClientOnly>
  </template>


<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;

  .flow-chart {
    flex: 2;
  }

  .editor-section {
    background: whitesmoke;
    flex: 1;
    text-align: center;
  }
}

.app-title
{
  background-color: orange;
  color: white;
  font-weight: bold;
  margin: auto;
  width: 60%;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 1.5rem;
  
  
}
</style>