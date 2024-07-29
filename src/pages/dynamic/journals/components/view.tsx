import { ProCard } from '@ant-design/pro-components';
import { Drawer, Statistic } from 'antd';
import { FC } from 'react';

interface ViewProps {
  record: API.Pet | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRecord: React.Dispatch<React.SetStateAction<API.Pet | null>>;
}

const { Divider } = ProCard;

const ViewJournals: FC<ViewProps> = (props) => {
  const { record, setCurrentRecord, open, setOpen } = props;
  console.log(record);
  return (
    <Drawer
      title=" جزئیات "
      closable
      destroyOnClose
      placement="left"
      open={open}
      onClose={() => {
        setOpen(false);
        setCurrentRecord(null);
      }}
      width="700px"
    >
      <Statistic title="آیدی " value={record?.id} />
      <Divider type={'horizontal'} />
      <Statistic title="نام" value={record?.name} />
      <Divider type={'horizontal'} />
      <Statistic title="وضعیت" value={record?.status} />
    </Drawer>
  );
};

export default ViewJournals;
