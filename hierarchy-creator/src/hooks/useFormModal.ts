import { useState } from 'react';
import { Form } from 'antd';
import { DataNode } from '../types/data-node.types';

export const useFormModal = (onSubmit: (values: { title: string; parent?: string }) => void) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNode, setCurrentNode] = useState<DataNode | null>(null);
  const [form] = Form.useForm();

  const openModal = (node: DataNode | null) => {
    setCurrentNode(node);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return {
    modalVisible,
    currentNode,
    form,
    openModal,
    closeModal,
    handleFormSubmit: (values: { title: string; parent?: string }) => {
      onSubmit(values);
      closeModal();
    },
  };
};
