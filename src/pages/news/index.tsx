import { findPetsByStatus } from '@/services/ant-design-pro/pet';
import { DeleteOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, Modal, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import AddModal from './components/addModal';
import EditModal from './components/editModal';
import ViewModal from './components/viewModal';
import useStyles from './style.style';

const News: React.FC = () => {
  const { styles: classes } = useStyles();

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
  //   const { data, error, loading } = useRequest(async () => {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   });

  const { initialState } = useModel('@@initialState');

  const columns: ProColumns<API.Pet>[] = [
    {
      title: 'آیدی ',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: 'نام',
      dataIndex: 'name',
      hideInSearch: true,
    },
    //     {
    //       title: 'دسته',
    //       dataIndex: 'category.name',
    //     },
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
          <ViewModal
            trigger={
              <Button shape="circle" key="view" className={classes.viewButton}>
                <Tooltip title="مشاهده">
                  <EyeOutlined />
                </Tooltip>
              </Button>
            }
            key="view"
            //     onOk={actionRef.current?.reload}
            values={record}
          />,
          <EditModal
            trigger={
              <Button shape="circle" key="edit" className={classes.editButton}>
                <Tooltip title="ویرایش">
                  <FormOutlined />
                </Tooltip>
              </Button>
            }
            key="edit"
            //     onOk={actionRef.current?.reload}
            values={record}
          />,

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

  const [params, setParams] = useState({}); // Initial params (including status filter)
  const handleParamsChange = (newParams) => {
    console.log(newParams);
    //     setParams(params=>{return{...params,page: newParams.current,
    //         pageSize: newParams.pageSize}}); // Update state on table changes (sorting, filtering)
  };
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
          //   dataSource={newsList}
          //     dataSource={data}

          params={params}
          request={findPetsByStatus}
          //   onReset={() => {
          //     setParams({ status: 'available', pageSize: 10, current: 1 });
          //   }}
          //   onSubmit={() => {
          //     setParams({ status: 'available', pageSize: 10, current: 1 });
          //   }}
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
            <AddModal
              key="AddModal"
              reload={actionRef.current?.reload}
              trigger={
                <Button key="Add News" type="primary" className={classes.addButton}>
                  افزودن
                </Button>
              }
            />,
          ]}
        />
        {/* {data && data.map((post: any) => <li key={post.id}>{post.title}</li>)} */}
      </Card>
    </PageContainer>
  );
};

export default News;
