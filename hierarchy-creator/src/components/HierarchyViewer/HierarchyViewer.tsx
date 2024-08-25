import React from 'react';
import { Tree } from 'antd';
import { DataNode } from '../../types/data-node.types';

interface HierarchyViewerProps {
  treeData: DataNode[];
}

const HierarchyViewer: React.FC<HierarchyViewerProps> = ({ treeData }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {treeData.length > 0 ? (
        <Tree
          treeData={treeData}
          titleRender={(nodeData: DataNode) => <span>{nodeData.title}</span>}
          className="border border-gray-300 rounded"
        />
      ) : (
        <p className="text-center text-gray-500">Nenhum nó para exibir.</p>
      )}
    </div>
  );
};

export default HierarchyViewer;
