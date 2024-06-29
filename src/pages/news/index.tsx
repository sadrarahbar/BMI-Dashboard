import { DeleteOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, Modal, Tooltip } from 'antd';
import React, { useRef } from 'react';
import { useRequest } from 'umi';
import AddModal from './components/addModal';
import EditModal from './components/editModal';
import ViewModal from './components/viewModal';
import useStyles from './style.style';

const News: React.FC = () => {
  const { styles: classes } = useStyles();
  //   const mockNewsList: API.NewsItem[] = [
  //     {
  //       id: 1,
  //       title: 'برگزاری المپیاد برنامه نویسی',
  //       category: 'تکنولوژی',
  //       author: 'مریم سعیدی',
  //       content:
  //         'دانش آموزانی که در آزمون المپیاد علمی دانش آموزی ۱۴۰۲ - ۱۴۰۳ ثبت نام نموده اند، باید از زمان برگزاری المپیاد اطلاع داشته باشند. آگاهی از تاریخ برگزاری المپیاد علمی برای برنامه ریزی دانش آموزان و دریافت کارت ورود به جلسه امری ضروری تلقی می گردد. زمان برگزاری المپیاد های مرحله دوم از 25 فروردین لغایت 1 اردیبهشت ماه 1403 می باشد که در متن مقاله تاریخ برگزاری هر یک از آزمون ها ارائه شده است. ',
  //       publishDate: '2024-06-24',
  //     },
  //     {
  //       id: 2,
  //       title: 'قهرمانی تیم ملی ایران',
  //       category: 'ورزشی',
  //       content:
  //         'تیم ملی کشور ایران توانسته شش بار به جام جهانی صعود کند که شامل جام جهانی ۱۹۷۸ آرژانتین ، جام جهانی ۱۹۹۸ فرانسه ، جام جهانی ۲۰۰۶ آلمان ، جام جهانی ۲۰۱۴ برزیل ، جام جهانی ۲۰۱۸ روسیه و جام جهانی ۲۰۲۲ قطر می باشد. کارلوس کیروش به عنوان مربی با تیم ملی ایران ۳بار در جام جهانی حضور داشته است.',
  //       publishDate: '2024-06-23',
  //     },
  //   ];

  const showDeleteconfirm = () =>
    // currentItem: API.NewsItem
    {
      Modal.confirm({
        title: 'حذف کار',
        content: 'آیا مطمئن هستید که می‌خواهید این خبر را حذف کنید؟',
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
  const { data, error, loading } = useRequest(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  const { initialState } = useModel('@@initialState');

  const columns: ProColumns<API.NewsItem>[] = [
    {
      title: 'آیدی خبر',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'آیدی کاربر',
      dataIndex: 'userId',
    },
    {
      title: 'عنوان',
      dataIndex: 'title',
      sorter: true,
    },
    {
      title: 'محتوا',
      dataIndex: 'body',
      sorter: true,
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
  //     const columns: ProColumns<API.NewsItem>[] = [
  //         {
  //           title: 'عنوان',
  //           dataIndex: 'title',
  //           sorter: true,
  //         },
  //         {
  //           title: 'دسته',
  //           dataIndex: 'category',
  //           valueEnum: {
  //             1: {
  //               text: 'ورزشی',
  //               status: 'Success',
  //             },
  //             2: {
  //               text: 'تکنولژی',
  //               status: 'Error',
  //             },
  //           },
  //         },
  //         {
  //           title: 'نویسنده',
  //           dataIndex: 'author',
  //         },
  //         {
  //           title: 'تاریخ انتشار',
  //           dataIndex: 'publishDate',
  //           valueType: 'dateTime',
  //         },
  //         {
  //           title: 'عملیات',
  //           dataIndex: 'actions',
  //           valueType: 'option',
  //           render: (_, record) => {
  //             return [
  //               <ViewModal
  //                 trigger={
  //                   <Button shape="circle" key="view" className={classes.viewButton}>
  //                     <Tooltip title="مشاهده">
  //                       <EyeOutlined />
  //                     </Tooltip>
  //                   </Button>
  //                 }
  //                 key="view"
  //                 //     onOk={actionRef.current?.reload}
  //                 values={record}
  //               />,
  //               <EditModal
  //                 trigger={
  //                   <Button shape="circle" key="edit" className={classes.editButton}>
  //                     <Tooltip title="ویرایش">
  //                       <FormOutlined />
  //                     </Tooltip>
  //                   </Button>
  //                 }
  //                 key="edit"
  //                 //     onOk={actionRef.current?.reload}
  //                 values={record}
  //               />,

  //               <Button
  //                 key="delete"
  //                 onClick={() => showDeleteconfirm(record)}
  //                 className={classes.deleteButton}
  //                 shape="circle"
  //               >
  //                 <Tooltip title="حذف">
  //                   <DeleteOutlined />
  //                 </Tooltip>
  //               </Button>,
  //             ];
  //           },
  //         },
  //       ];
  if (loading) {
    return <div>در حال بارگزاری ...</div>;
  }

  if (error) {
    return <div>خطا : {error.message}</div>;
  }
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
          dataSource={data}
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
                  افزودن خبر
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
