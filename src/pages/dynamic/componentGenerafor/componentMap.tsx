import { lazy } from 'react';

// Lazy load @ant-design/pro-components
const PageContainer = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.PageContainer })),
);
const ProForm = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProForm })),
);
const ProFormSelect = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormSelect })),
);
const ProFormText = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormText })),
);
const ProFormUploadDragger = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormUploadDragger })),
);
const ProCard = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProCard })),
);
const ProTable = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProTable })),
);
const ProDescriptions = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProDescriptions })),
);
const ProLayout = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProLayout })),
);
const ProList = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProList })),
);
const ProField = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProField })),
);
const ProFormDependency = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormDependency })),
);
const ProFormFieldSet = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormFieldSet })),
);
const ProGroup = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProGroup })),
);
const ProFormList = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormList })),
);
const ProFormMoney = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormMoney })),
);
const ProFormRadio = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormRadio })),
);
const ProFormRate = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormRate })),
);
const ProFormSlider = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormSlider })),
);
const ProFormSwitch = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormSwitch })),
);
const ProFormTextArea = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormTextArea })),
);
const ProFormTimePicker = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormTimePicker })),
);
const ProFormTreeSelect = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormTreeSelect })),
);
const ProFormCaptcha = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormCaptcha })),
);
const ProFormDateRangePicker = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({
    default: module.ProFormDateRangePicker,
  })),
);
const ProFormDateTimePicker = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({
    default: module.ProFormDateTimePicker,
  })),
);
const ProFormDigit = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormDigit })),
);
// const ProFormSelectOption = lazy(() => import('@ant-design/pro-components').then(module => ({ default: module.ProFormSelectOption })));
const ProFormDatePicker = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormDatePicker })),
);
const ProFormCheckbox = lazy(() =>
  import('@ant-design/pro-components').then((module) => ({ default: module.ProFormCheckbox })),
);

// Lazy load antd components
const Affix = lazy(() => import('antd').then((module) => ({ default: module.Affix })));
const Anchor = lazy(() => import('antd').then((module) => ({ default: module.Anchor })));
const AutoComplete = lazy(() =>
  import('antd').then((module) => ({ default: module.AutoComplete })),
);
const Alert = lazy(() => import('antd').then((module) => ({ default: module.Alert })));
const Avatar = lazy(() => import('antd').then((module) => ({ default: module.Avatar })));
const BackTop = lazy(() => import('antd').then((module) => ({ default: module.BackTop })));
const Badge = lazy(() => import('antd').then((module) => ({ default: module.Badge })));
const Breadcrumb = lazy(() => import('antd').then((module) => ({ default: module.Breadcrumb })));
const Button = lazy(() => import('antd').then((module) => ({ default: module.Button })));
const Calendar = lazy(() => import('antd').then((module) => ({ default: module.Calendar })));
const Card = lazy(() => import('antd').then((module) => ({ default: module.Card })));
const Collapse = lazy(() => import('antd').then((module) => ({ default: module.Collapse })));
const Carousel = lazy(() => import('antd').then((module) => ({ default: module.Carousel })));
const Cascader = lazy(() => import('antd').then((module) => ({ default: module.Cascader })));
const Checkbox = lazy(() => import('antd').then((module) => ({ default: module.Checkbox })));
const Col = lazy(() => import('antd').then((module) => ({ default: module.Col })));
// const Comment = lazy(() => import('antd').then(module => ({ default: module.Comment })));
const ConfigProvider = lazy(() =>
  import('antd').then((module) => ({ default: module.ConfigProvider })),
);
const DatePicker = lazy(() => import('antd').then((module) => ({ default: module.DatePicker })));
const Descriptions = lazy(() =>
  import('antd').then((module) => ({ default: module.Descriptions })),
);
const Divider = lazy(() => import('antd').then((module) => ({ default: module.Divider })));
const Drawer = lazy(() => import('antd').then((module) => ({ default: module.Drawer })));
const Dropdown = lazy(() => import('antd').then((module) => ({ default: module.Dropdown })));
const Empty = lazy(() => import('antd').then((module) => ({ default: module.Empty })));
const Form = lazy(() => import('antd').then((module) => ({ default: module.Form })));
// const Grid = lazy(() => import('antd').then(module => ({ default: module.Grid })));
const Input = lazy(() => import('antd').then((module) => ({ default: module.Input })));
const Image = lazy(() => import('antd').then((module) => ({ default: module.Image })));
const InputNumber = lazy(() => import('antd').then((module) => ({ default: module.InputNumber })));
const Layout = lazy(() => import('antd').then((module) => ({ default: module.Layout })));
const List = lazy(() => import('antd').then((module) => ({ default: module.List })));
// const message = lazy(() => import('antd').then(module => ({ default: module.message })));
const Menu = lazy(() => import('antd').then((module) => ({ default: module.Menu })));
const Mentions = lazy(() => import('antd').then((module) => ({ default: module.Mentions })));
const Modal = lazy(() => import('antd').then((module) => ({ default: module.Modal })));
// const notification = lazy(() => import('antd').then(module => ({ default: module.notification })));
const Pagination = lazy(() => import('antd').then((module) => ({ default: module.Pagination })));
const Popconfirm = lazy(() => import('antd').then((module) => ({ default: module.Popconfirm })));
const Popover = lazy(() => import('antd').then((module) => ({ default: module.Popover })));
const Progress = lazy(() => import('antd').then((module) => ({ default: module.Progress })));
const Radio = lazy(() => import('antd').then((module) => ({ default: module.Radio })));
const Rate = lazy(() => import('antd').then((module) => ({ default: module.Rate })));
const Result = lazy(() => import('antd').then((module) => ({ default: module.Result })));
const Row = lazy(() => import('antd').then((module) => ({ default: module.Row })));
const Select = lazy(() => import('antd').then((module) => ({ default: module.Select })));
const Skeleton = lazy(() => import('antd').then((module) => ({ default: module.Skeleton })));
const Slider = lazy(() => import('antd').then((module) => ({ default: module.Slider })));
const Space = lazy(() => import('antd').then((module) => ({ default: module.Space })));
const Spin = lazy(() => import('antd').then((module) => ({ default: module.Spin })));
const Statistic = lazy(() => import('antd').then((module) => ({ default: module.Statistic })));
const Steps = lazy(() => import('antd').then((module) => ({ default: module.Steps })));
const Switch = lazy(() => import('antd').then((module) => ({ default: module.Switch })));
const Table = lazy(() => import('antd').then((module) => ({ default: module.Table })));
const Tabs = lazy(() => import('antd').then((module) => ({ default: module.Tabs })));
const Tag = lazy(() => import('antd').then((module) => ({ default: module.Tag })));
const TimePicker = lazy(() => import('antd').then((module) => ({ default: module.TimePicker })));
const Timeline = lazy(() => import('antd').then((module) => ({ default: module.Timeline })));
const Tooltip = lazy(() => import('antd').then((module) => ({ default: module.Tooltip })));
const Transfer = lazy(() => import('antd').then((module) => ({ default: module.Transfer })));
const Tree = lazy(() => import('antd').then((module) => ({ default: module.Tree })));
const TreeSelect = lazy(() => import('antd').then((module) => ({ default: module.TreeSelect })));
const Typography = lazy(() => import('antd').then((module) => ({ default: module.Typography })));
const Upload = lazy(() => import('antd').then((module) => ({ default: module.Upload })));

// Map of all lazy-loaded components
const componentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
  // @ant-design/pro-components
  PageContainer,
  ProForm,
  ProFormUploadDragger,
  ProFormText,
  ProFormSelect,
  ProCard,
  ProTable,
  ProDescriptions,
  ProLayout,
  ProList,
  ProField,
  ProFormDependency,
  ProFormFieldSet,
  ProGroup,
  ProFormList,
  ProFormMoney,
  ProFormRadio,
  ProFormRate,
  ProFormSlider,
  ProFormSwitch,
  ProFormTextArea,
  ProFormTimePicker,
  ProFormTreeSelect,
  ProFormCaptcha,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  //   ProFormSelectOption,
  ProFormDatePicker,
  ProFormCheckbox,

  // antd
  Affix,
  Anchor,
  AutoComplete,
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Collapse,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  //   Comment,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  //   Grid,
  Input,
  Image,
  InputNumber,
  Layout,
  List,
  //   message,
  Menu,
  Mentions,
  Modal,
  //   notification,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Rate,
  Result,
  Row,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Typography,
  Upload,
};
export default componentMap;
