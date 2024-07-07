import { findPetsByStatus } from '@/services/ant-design-pro/pet';
import { DeleteOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Link, useModel } from '@umijs/max';
import { Button, Card, Image, Modal, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import View from './components/view';
import useStyles from './style.style';

const Dynamic: React.FC = () => {
  const { styles: classes } = useStyles();
  const [currentRecord, setCurrentRecord] = useState<API.Pet|null>(null);
  const [openView, setOpenView] = useState<boolean>(false);
  const showDeleteconfirm = (currentItem: API.Pet) => {
    Modal.confirm({
      title: 'حذف ',
      content: 'آیا از حذف اطمینان دارید ؟',
      okText: 'تأیید',
      cancelText: 'لغو',
      centered: true,
      style: { direction: 'rtl' },
      //       onOk() {
      //         console.log('OK');
      //       },
      //       onCancel() {
      //         console.log('Cancel');
      //       },
      //   onOk: () => deleteItem(currentItem),
    });
  };
  const actionRef = useRef<ActionType>();

  const [params, setParams] = useState({}); // Initial params (including status filter)
  const handleParamsChange = (newParams) => {
    console.log(newParams);

    //     setParams(params=>{return{...params,page: newParams.current,
    //         pageSize: newParams.pageSize}}); // Update state on table changes (sorting, filtering)
  };
  const { initialState } = useModel('@@initialState');
  const columns: ProColumns<API.Pet>[] = [
    {
      title: 'تصویر',
      width: 80,
      hideInSearch: true,
      valueType: 'image',
      render: (_, record) => (
        <Image.PreviewGroup items={record.photoUrls}>
          <Image
            width={50}
            alt="Pet Photo"
            fallback="data:image/png;base64,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"
          />
        </Image.PreviewGroup>
      ),
    },
    {
      title: 'شناسه ',
      dataIndex: 'id',
      width: 200,
      hideInSearch: true,
    },
    {
      title: 'نام',
      dataIndex: 'name',
      hideInSearch: true,
      //       width: 100,
      ellipsis: true,
      render: (_, record) => {
        return <p className={classes.tableItem}>{record?.name}</p>;
      },
    },

    {
      title: 'دسته',
      dataIndex: 'category.name',
      hideInSearch: true,
      width: 100,
      ellipsis: true,
      render: (_, record) => {
        return record?.category?.name ? record?.category.name : '-';
      }, // Display '-' if category.name is missing
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      initialValue: 'available',
      valueEnum: {
        available: {
          text: 'available',
          status: 'Success',
        },
        pending: {
          text: 'pending',
          status: 'Warning',
        },
        sold: {
          text: 'sold',
          status: 'Error',
        },
      },
    },
    {
      title: 'عملیات',
      dataIndex: 'actions',
      valueType: 'option',
      render: (_, record) => {
        return [
          <Button
            shape="circle"
            key="view"
            onClick={() => {
              setOpenView(true);
              setCurrentRecord(record);
            }}
            className={classes.viewButton}
          >
            <Tooltip title="مشاهده">
              <EyeOutlined />
            </Tooltip>
          </Button>,
          <Link to={`/content/dynamic/edit/${record?.id}`} key="edit" state={record}>
            <Button shape="circle" className={classes.editButton}>
              <Tooltip title="ویرایش">
                <FormOutlined />
              </Tooltip>
            </Button>
          </Link>,
          <Button
            key="delete"
            onClick={() => showDeleteconfirm(record)}
            className={classes.deleteButton}
            shape="circle"
          >
            <Tooltip title="حذف">
              <DeleteOutlined />
            </Tooltip>
          </Button>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <Card
        style={{}}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <ProTable
          params={params}
          request={findPetsByStatus}
          onChange={handleParamsChange}
          columns={columns}
          actionRef={actionRef}
          rowKey="id"
          search={{
            layout: 'vertical',
            labelWidth: 180,
            defaultCollapsed: true,
          }}
          toolBarRender={() => [
            <Link to="/content/dynamic/create" key="create">
              <Button key="Add" type="primary" className={classes.addButton}>
                افزودن
              </Button>
            </Link>,
          ]}
        />
      </Card>
      <View record={currentRecord} setCurrentRecord={setCurrentRecord} open={openView} setOpen={setOpenView} />
    </PageContainer>
  );
};

export default Dynamic;
