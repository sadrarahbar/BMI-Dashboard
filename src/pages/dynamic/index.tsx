import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';
import Journals from './journals';
import UpdateJournals from './journals/update';
import News from './news';
import UpdateNews from './news/update';

const DynamicPage: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const { location } = history;
  console.log(location.pathname);
  const Content = () => {
    if (location.pathname === '/content/dynamic/news') {
      return <News />;
    } else if (location.pathname === '/content/dynamic/news/create') {
      return <UpdateNews />;
    } else if (location.pathname.startsWith('/content/dynamic/news/edit')) {
      return <UpdateNews />;
    } else if (location.pathname === '/content/dynamic/journals') {
      return <Journals />;
    } else if (location.pathname === '/content/dynamic/journals/create') {
      return <UpdateJournals />;
    } else if (location.pathname.startsWith('/content/dynamic/journals/edit')) {
      return <UpdateJournals />;
    }

    // Fallback to handle unmatched routes
    return <div>Page not found</div>;
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
        <Content />
      </Card>
    </PageContainer>
  );
};

export default DynamicPage;
