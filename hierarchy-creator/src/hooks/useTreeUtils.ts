import { useCallback } from 'react';
import { DataNode } from '../types/data-node.types';

export const useTreeUtils = () => {
  const convertTreeDataToJson = useCallback((nodes: DataNode[]): any => {
    const result: any = {};
    const buildJson = (node: DataNode, existingTitles: Set<string>): any => {
      if (node.children && node.children.length > 0) {
        const childrenObj: any = {};
        node.children.forEach((child) => {
          if (existingTitles.has(child.title)) {
            return;
          }
          existingTitles.add(child.title);
          if (child.children && child.children.length > 0) {
            childrenObj[child.title] = buildJson(child, existingTitles);
          } else {
            if (!Array.isArray(childrenObj[node.title])) {
              childrenObj[node.title] = [];
            }
            childrenObj[node.title].push(child.title);
          }
        });
        if (
          Object.keys(childrenObj).length === 1 &&
          Array.isArray(childrenObj[node.title])
        ) {
          return childrenObj[node.title];
        }
        return childrenObj;
      } else {
        return [node.title];
      }
    };
    const existingTitles = new Set<string>();
    nodes.forEach((node) => {
      if (!existingTitles.has(node.title)) {
        existingTitles.add(node.title);
        result[node.title] = buildJson(node, existingTitles);
      }
    });
    return result;
  }, []);

  const handleSave = useCallback(
    (treeData: DataNode[]) => {
      const formattedData = convertTreeDataToJson(treeData);
      const json = JSON.stringify(formattedData, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'hierarchy.json';
      a.click();
      URL.revokeObjectURL(url);
    },
    [convertTreeDataToJson]
  );

  const getParentOptions = useCallback((nodes: DataNode[]): DataNode[] => {
    let result: DataNode[] = [];
    const traverse = (nodes: DataNode[], path: string[] = []) => {
      nodes.forEach((node) => {
        result.push({ ...node, key: path.concat(node.key).join('/') });
        if (node.children) {
          traverse(node.children, path.concat(node.key));
        }
      });
    };
    traverse(nodes);
    return result;
  }, []);

  return { convertTreeDataToJson, handleSave, getParentOptions };
};
