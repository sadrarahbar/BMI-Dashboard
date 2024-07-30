import React, { useRef } from 'react';
import { ProTable, ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Tooltip, Modal, message, Card } from 'antd';
import { EyeOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useStyles from './style.style';
interface ListGeneratorProps {
  json: {
    columns: ProColumns<any>[];
    rowKey: string;
    search: any;
    toolBarRender: any[];
  };
  request: (params: any) => Promise<any>;
}

const ListGenerator: React.FC<ListGeneratorProps> = ({ json, request }) => {
        const { styles: classes } = useStyles();
        const actionRef = useRef<ActionType>();

  const showDeleteConfirm = (currentItem: any, deleteAction: any) => {
    Modal.confirm({
      title: 'حذف',
      content: `آیا از حذف ${currentItem?.name} اطمینان دارید؟`,
      okText: 'تأیید',
      cancelText: 'لغو',
      centered: true,
      onOk() {
        deleteAction(currentItem);
        message.success('با موفقیت حذف شد');
        actionRef.current?.reload();
      },
    });
  };

  const generateColumns = (columnsJson: any[]) => {
    return columnsJson.map((column) => {
      if (column.dataIndex === 'actions') {
        return {
          ...column,
          render: (_: any, record: any) => (
            column.actions.map((action: any) => {
              if (action.type === 'view') {
                return (
                  <Tooltip title="مشاهده" key="view">
                    <Button
                      shape="circle"
                      onClick={() => action.onClick(record)}
                      className={classes.viewButton}
                    >
                      <EyeOutlined />
                    </Button>
                  </Tooltip>
                );
              } else if (action.type === 'edit') {
                return (
                  <Link to={`${action.link}/${record.id}`} key="edit" state={record}>
                    <Tooltip title="ویرایش">
                      <Button shape="circle" className={classes.editButton}>
                        <FormOutlined />
                      </Button>
                    </Tooltip>
                  </Link>
                );
              } else if (action.type === 'delete') {
                return (
                  <Tooltip title="حذف" className={classes.deleteButton} key="delete">
                    <Button
                      shape="circle"
                      onClick={() => showDeleteConfirm(record, action.onClick)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                );
              }
              return null;
            })
          ),
        };
      }
      return column;
    });
  };

  return (
        <Card
        styles={{
          body: { padding: '0px' },
        }}
      >

              <ProTable
                actionRef={actionRef}
                columns={generateColumns(json.columns)}
                request={request}
                rowKey={json.rowKey}
                search={json.search}
                toolBarRender={() => json.toolBarRender.map((button: any) => (
                  <Link to={button.link} key={button.key}>
                    <Button type={button.type}>{button.text}</Button>
                  </Link>
                ))}
              />
      </Card>
  );
};

export default ListGenerator;