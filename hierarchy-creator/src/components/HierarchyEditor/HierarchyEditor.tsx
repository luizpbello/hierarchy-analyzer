import React from 'react';
import { Button, Form, Modal, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useTreeData } from '../../hooks/useTreeData';
import { useFormModal } from '../../hooks/useFormModal';
import { useTreeUtils } from '../../hooks/useTreeUtils';
import HierarchyViewer from '../HierarchyViewer/HierarchyViewer';

const HierarchyEditor: React.FC = () => {
  const { treeData, addNode } = useTreeData();
  const {
    modalVisible,
    form,
    openModal,
    closeModal,
    handleFormSubmit,
  } = useFormModal(({ title, parent }) => addNode(title, parent));
  const { getParentOptions, convertTreeDataToJson } = useTreeUtils();

  const handleSave = () => {
    const formattedData = convertTreeDataToJson(treeData);
    const json = JSON.stringify(formattedData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hierarchy.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal(null)}
      >
        Adicionar Nó
      </Button>
      <HierarchyViewer treeData={treeData} />
      <Modal
        title="Adicionar Nó"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        centered
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'Por favor, insira o título!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="parent" label="Adicionar como filho de">
            <Select placeholder="Selecionar pai">
              <Select.Option value="">Raiz</Select.Option>
              {getParentOptions(treeData).map((node) => (
                <Select.Option key={node.key} value={node.key}>
                  {node.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="default"
        onClick={handleSave}
        style={{ marginTop: '16px' }}
      >
        Salvar JSON
      </Button>
    </div>
  );
};

export default HierarchyEditor;
