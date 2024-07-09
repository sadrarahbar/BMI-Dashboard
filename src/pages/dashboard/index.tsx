import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Card, Col, Row, Skeleton, Statistic } from 'antd';
import type { FC } from 'react';
import useStyles from './style.style';
// import CompositeFacetCircle from './components/compositeFacetCircle';

const PageHeaderContent: FC<{
  currentUser: Partial<CurrentUser>;
}> = ({ currentUser }) => {
  const { styles } = useStyles();
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>{currentUser.name}</div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};
const ExtraContent: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="تعداد پروژه‌ها" value={56} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="رتبه در تیم" value={8} suffix="/ 24" />
      </div>
      <div className={styles.statItem}>
        <Statistic title="بازدید پروژه‌ها" value={2223} />
      </div>
    </div>
  );
};
const Dashboard: FC = () => {

  return (
    <PageContainer
      content={
        <PageHeaderContent
          currentUser={{
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: 'فائزه مرادی',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            signature: 'زندگی زیباست',
            title: 'کارشناس پروژه',
            group: 'معاونت نرم افزار - مهندس جعفرزاده',
          }}
        />
      }
//       extraContent={<ExtraContent />}
    >
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="عنوان "
            //     loading={data?.radarData?.length === 0}
          >
            <div>محتوا</div>
          </Card>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="عنوان "
            //     loading={data?.radarData?.length === 0}
          >
            <div>محتوا</div>
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="عنوان "
            //     loading={data?.radarData?.length === 0}
          >
            <div>محتوا</div>
          </Card>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="عنوان "
            //     loading={data?.radarData?.length === 0}
          >
            <div>محتوا</div>
          </Card>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="عنوان "
            //     loading={data?.radarData?.length === 0}
          >
            <div>محتوا</div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default Dashboard;
