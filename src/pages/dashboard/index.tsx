import { InfoCircleOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Card, Col, Row, Skeleton, Statistic, Tooltip } from 'antd';
import type { FC } from 'react';
import ChartCard from './components/ChartCard';
import CompositeFacetCircle from './components/compositeFacetCircle';
import Field from './components/Field';
import DemoScatter from './components/StackedScatterplot';
import useStyles from './style.style';

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
        <Statistic title="رتبه در تیم" value={8} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="بازدید پروژه‌ها" value={2223} />
      </div>
    </div>
  );
};
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
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
      extraContent={<ExtraContent />}
    >
      <Row gutter={24}>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="کل فروش"
            action={
              <Tooltip title="توضیحات شاخص">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => <p>126560</p>}
            footer={<Field label="فروش روزانه" value={`1000`} />}
            contentHeight={46}
          >
            <Area
              xField="time"
              yField="value"
              shapeField="smooth"
              height={46}
              axis={false}
              style={{
                fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
                fillOpacity: 0.6,
                width: '100%',
              }}
              padding={-20}
              data={[
                { time: '1991', value: 30 },
                { time: '1992', value: 111 },
                { time: '1993', value: 115 },
                { time: '1994', value: 188 },
                { time: '1995', value: 116 },
                { time: '1996', value: 200 },
                { time: '1997', value: 106 },
                { time: '1998', value: 110 },
                { time: '1999', value: 201 },
                { time: '2000', value: 199 },
              ]}
            />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="کل خرید"
            action={
              <Tooltip title="توضیحات شاخص یک">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => <p>126560</p>}
            footer={<Field label="فروش روزانه" value={`100`} />}
            contentHeight={46}
          >
            <Area
              xField="time"
              yField="value"
              shapeField="smooth"
              height={46}
              axis={false}
              style={{
                fill: 'linear-gradient(-90deg, white 0%, #ee7c31 100%)',
                fillOpacity: 0.6,
                width: '100%',
              }}
              padding={-20}
              data={[
                { time: '1991', value: 30 },
                { time: '1992', value: 28 },
                { time: '1993', value: 34 },
                { time: '1994', value: 18 },
                { time: '1995', value: 88 },
                { time: '1996', value: 88 },
                { time: '1997', value: 100 },
                { time: '1998', value: 90 },
                { time: '1999', value: 78 },
                { time: '2000', value: 100 },
              ]}
            />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="کل فروش"
            action={
              <Tooltip title="توضیحات شاخص">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => <p>260</p>}
            footer={<Field label=" فروش ماه قبل" value={`1000`} />}
            contentHeight={46}
          >
            <Area
              xField="time"
              yField="value"
              shapeField="smooth"
              height={46}
              axis={false}
              style={{
                fill: 'linear-gradient(-90deg, white 0%, #9fe45f 100%)',
                fillOpacity: 0.6,
                width: '100%',
              }}
              padding={-20}
              data={[
                { time: '1991', value: 100 },
                { time: '1992', value: 110 },
                { time: '1993', value: 250 },
                { time: '1994', value: 100 },
                { time: '1995', value: 160 },
                { time: '1996', value: 299 },
                { time: '1997', value: 160 },
                { time: '1998', value: 110 },
                { time: '1999', value: 100 },
                { time: '2000', value: 190 },
              ]}
            />
          </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="کل فروش"
            action={
              <Tooltip title="توضیحات شاخص">
                <InfoCircleOutlined />
              </Tooltip>
            }
            total={() => <p>126560</p>}
            footer={<Field label="فروش روزانه" value={`1000`} />}
            contentHeight={46}
          >
            <Area
              xField="time"
              yField="value"
              shapeField="smooth"
              height={46}
              axis={false}
              style={{
                fill: 'linear-gradient(-90deg, white 0%, #5fdbe4 100%)',
                fillOpacity: 0.6,
                width: '100%',
              }}
              padding={-20}
              data={[
                { time: '1991', value: 20 },
                { time: '1992', value: 11 },
                { time: '1993', value: 25 },
                { time: '1994', value: 18 },
                { time: '1995', value: 16 },
                { time: '1996', value: 20 },
                { time: '1997', value: 16 },
                { time: '1998', value: 10 },
                { time: '1999', value: 21 },
                { time: '2000', value: 19 },
              ]}
            />
          </ChartCard>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="تغییرات فصلی "
            //     loading={data?.radarData?.length === 0}
          >
            <DemoScatter />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="امتیاز کلی "
            //     loading={data?.radarData?.length === 0}
          >
            {/* <div> */}
              <CompositeFacetCircle />
            {/* </div> */}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default Dashboard;
