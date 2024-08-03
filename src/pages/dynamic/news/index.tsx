import { deletePet, findPetsByStatus } from '@/services/ant-design-pro/pet';
import { ActionType } from '@ant-design/pro-components';
import { getLocale, useAccess } from '@umijs/max';
import { message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import ListGenerator from '../componentGenerafor/list';
import View from './components/view';
import useStyles from './style.style';

const News: React.FC = () => {
  const access = useAccess();
  const [currentRecord, setCurrentRecord] = useState<API.Pet | null>(null);
  const [openView, setOpenView] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const { styles: classes } = useStyles();

  const showDeleteconfirm = (currentItem: API.Pet) => {
    Modal.confirm({
      title: 'حذف ',
      content: `آیا از حذف ${currentItem?.name} اطمینان دارید ؟`,
      okText: 'تأیید',
      cancelText: 'لغو',
      centered: true,
      style: { direction: getLocale() === 'fa-IR' ? 'rtl' : 'ltr' },
      onOk() {
        console.log('OK');
        deletePet({ petId: currentItem?.key }).then((res) => {
          if (res.code === 200) {
            actionRef.current.reload();
            message.success('با موفقیت حذف شد');
          }
        });
      },
      //       onCancel() {
      //         console.log('Cancel');
      //       },
      //   onOk: () => deleteItem(currentItem),
    });
  };

  const newsListJson = {
    columns: [
      {
        title: 'تصویر',
        width: 100,
        hideInSearch: true,
        valueType: 'image',
        render: (_, record) => <></>,
      },
      {
        title: 'شناسه ',
        dataIndex: 'id',
        width: 350,
        hideInSearch: true,
      },
      {
        title: 'نام',
        dataIndex: 'name',
        hideInSearch: true,
        width: 130,
        ellipsis: true,
        render: (_, record) => <p className={classes.tableItem}>{record?.name}</p>,
      },
      {
        title: 'دسته',
        dataIndex: 'category.name',
        hideInSearch: true,
        width: 130,
        ellipsis: true,
        render: (_, record) => (record?.category?.name ? record?.category.name : '-'),
      },
      {
        title: 'وضعیت',
        dataIndex: 'status',
        initialValue: 'available',
        width: 130,
        valueEnum: {
          available: { text: 'available', status: 'Success' },
          pending: { text: 'pending', status: 'Warning' },
          sold: { text: 'sold', status: 'Error' },
        },
      },
      {
        title: 'عملیات',
        dataIndex: 'actions',
        valueType: 'option',
        width: 150,
        fixed: 'right',
        actions: [
          {
            type: 'view',
            onClick: (record) => {
              setOpenView(true);
              setCurrentRecord(record);
            },
          },
          {
            type: 'edit',
            link: '/content/dynamic/news/edit',
          },
          {
            type: 'delete',
            onClick: (record) => showDeleteconfirm(record),
          },
        ],
      },
    ],
    rowKey: 'id',
    search: {
      layout: 'vertical',
      labelWidth: 180,
      defaultCollapsed: true,
    },
    toolBarRender: access.canAddNews
      ? [
          {
            key: 'create',
            link: '/content/dynamic/news/create',
            type: 'primary',
            text: 'افزودن',
          },
        ]
      : [],
  };

  return (
    <>
      <ListGenerator json={newsListJson} request={findPetsByStatus} />
      <View
        record={currentRecord}
        setCurrentRecord={setCurrentRecord}
        open={openView}
        setOpen={setOpenView}
      />
    </>
  );
};

export default News;
