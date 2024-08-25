import { useState } from 'react';
import { notification } from 'antd';
import { DataNode } from '../types/data-node.types';

const generateUniqueKey = () =>
  `key-${Math.random().toString(36).substr(2, 9)}`;

export const useTreeData = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  const addNodeRecursively = (
    nodes: DataNode[],
    path: string[],
    newNode: DataNode
  ): DataNode[] => {
    if (path.length === 0) {
      const titleExists = nodes.some((node) => node.title === newNode.title);
      if (titleExists) {
        notification.warning({
          message: 'Título Duplicado',
          description: `O título "${newNode.title}" já existe. Não foi possível adicionar o nó.`,
        });
        return nodes;
      }
      return [...nodes, newNode];
    }

    const [current, ...rest] = path;

    return nodes.map((node) => {
      if (node.key === current) {
        const titleExists = node.children?.some(
          (child) => child.title === newNode.title
        );
        if (titleExists) {
          notification.warning({
            message: 'Título Duplicado',
            description: `O título "${newNode.title}" já existe como filho de "${node.title}". Não foi possível adicionar o nó.`,
          });
          return node;
        }

        return {
          ...node,
          children: addNodeRecursively(node.children || [], rest, newNode),
        };
      }
      return node;
    });
  };

  const addNode = (title: string, parentKey?: string) => {
    const newNode: DataNode = { title, key: generateUniqueKey(), children: [] };
    setTreeData((prev) =>
      addNodeRecursively(prev, parentKey ? parentKey.split('/') : [], newNode)
    );
  };

  return { treeData, addNode };
};
