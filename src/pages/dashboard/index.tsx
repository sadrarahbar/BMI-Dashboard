import { InfoCircleOutlined } from '@ant-design/icons';
import { Area, Base, Scatter } from '@ant-design/plots';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Tooltip } from 'antd';
import type { FC } from 'react';
import ChartCard from './components/ChartCard';
import Field from './components/Field';

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
const data = [
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
];
const scatterConfig = {
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
  },
  height: 300,
  padding: 50,
  stack: {
    y1: 'y',
  },
  xField: (d) => 2021 - d.birth,
  yField: (d) => (d.gender === 'M' ? 1 : -1),
  colorField: 'gender',
  shapeField: 'point',
  scale: {
    x: { nice: true },
  },
  axis: {
    y: {
      title: '← Women · Men →',
      labelFormatter: (d) => `${Math.abs(+d)}`,
    },
    x: { title: 'Age →' },
  },
  legend: { color: { title: 'Gender' } },
  tooltip: { items: [{ channel: 'x', name: 'age' }] },
  annotations: [{ type: 'lineY', data: [0], style: { stroke: 'black' } }],
};
const baseChartConfig = {
  type: 'facetCircle',
  height: 270,
  autoFit: true,
  data: [
    { month: 'Jan.', name: 'A', value: 0.6326436603187056 },
    { month: 'Jan.', name: 'B', value: 0.9059036864077081 },
    { month: 'Jan.', name: 'C', value: 0.22780841416561715 },
    { month: 'Jan.', name: 'D', value: 0.1579683971505692 },
    { month: 'Feb.', name: 'A', value: 0.33301714406421823 },
    { month: 'Feb.', name: 'B', value: 0.03205686296291077 },
    { month: 'Feb.', name: 'C', value: 0.38611653432027015 },
    { month: 'Feb.', name: 'D', value: 0.7234835419120198 },
    { month: 'Mar.', name: 'A', value: 0.904928473886162 },
    { month: 'Mar.', name: 'B', value: 0.4484199491941676 },
    { month: 'Mar.', name: 'C', value: 0.2824508981652456 },
    { month: 'Mar.', name: 'D', value: 0.9685413602116679 },
    { month: 'Apr.', name: 'A', value: 0.041723574080341 },
    { month: 'Apr.', name: 'B', value: 0.8030787933582404 },
    { month: 'Apr.', name: 'C', value: 0.41748710621502005 },
    { month: 'Apr.', name: 'D', value: 0.5281546266115444 },
    { month: 'May', name: 'A', value: 0.8729036090146685 },
    { month: 'May', name: 'B', value: 0.28988839055401217 },
    { month: 'May', name: 'C', value: 0.33189556082639227 },
    { month: 'May', name: 'D', value: 0.21876873390293805 },
    { month: 'Jun.', name: 'A', value: 0.619594448441904 },
    { month: 'Jun.', name: 'B', value: 0.420356249903558 },
    { month: 'Jun.', name: 'C', value: 0.8796166275555974 },
    { month: 'Jun.', name: 'D', value: 0.6400454237168027 },
    { month: 'Jul.', name: 'A', value: 0.6908402378581739 },
    { month: 'Jul.', name: 'B', value: 0.12152124015288734 },
    { month: 'Jul.', name: 'C', value: 0.6033258688205794 },
    { month: 'Jul.', name: 'D', value: 0.5584958845688628 },
    { month: 'Aug.', name: 'A', value: 0.391095929118485 },
    { month: 'Aug.', name: 'B', value: 0.494137952382379 },
    { month: 'Aug.', name: 'C', value: 0.6116254958078564 },
    { month: 'Aug.', name: 'D', value: 0.5803641632635503 },
    { month: 'Sept.', name: 'A', value: 0.6506347276994731 },
    { month: 'Sept.', name: 'B', value: 0.8165757521460599 },
    { month: 'Sept.', name: 'C', value: 0.2279107933218536 },
    { month: 'Sept.', name: 'D', value: 0.37419172590345484 },
    { month: 'Oct.', name: 'A', value: 0.17980507555487946 },
    { month: 'Oct.', name: 'B', value: 0.8701220373856862 },
    { month: 'Oct.', name: 'C', value: 0.4737963124883502 },
    { month: 'Oct.', name: 'D', value: 0.7383798484457005 },
    { month: 'Nov.', name: 'A', value: 0.26679319143326663 },
    { month: 'Nov.', name: 'B', value: 0.15200589580375534 },
    { month: 'Nov.', name: 'C', value: 0.6648648719163961 },
    { month: 'Nov.', name: 'D', value: 0.5341976900165717 },
    { month: 'Dec.', name: 'A', value: 0.5889497642361026 },
    { month: 'Dec.', name: 'B', value: 0.7152071786469567 },
    { month: 'Dec.', name: 'C', value: 0.8096766390742625 },
    { month: 'Dec.', name: 'D', value: 0.8703522265977728 },
  ],
  encode: { position: 'month' },
  children: [{ type: 'interval', encode: { x: 'name', y: 'value', color: 'name' } }],
};
const Dashboard: FC = () => {
  return (
    <PageContainer>
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
              data={data}
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
              data={data}
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
              data={data}
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
              data={data}
            />
          </ChartCard>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{
              marginBottom: 24,
              height: '400px',
            }}
            bordered={false}
            title="تغییرات فصلی "
            //     loading={data?.radarData?.length === 0}
          >
            <Scatter
              {...scatterConfig}
              style={{
                width: '100%',
              }}
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{
              marginBottom: 24,
              height: '400px',
            }}
            bordered={false}
            title="امتیاز کلی "
          >
            <Base
              style={{
                width: '100%',
              }}
              {...baseChartConfig}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
