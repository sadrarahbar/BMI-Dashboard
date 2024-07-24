import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';

import React, { useMemo } from 'react';
import Journals from './journals';
import UpdateJournals from './journals/update';
import News from './news';
// import UpdateNews from './news/update';
import { updateNewsJson } from './news/fakeData';
import RenderElement from './renderElement';

// Extracted Content component for better readability and performance
const Content: React.FC<{ pathname: string }> = ({ pathname }) => {
  //   const [json, setJson] = useState<JsonComponent | null>(null);
  //   const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchJson = async () => {
  //       try {
  //         const response = await fetch(`/api/get-json?pathname=${encodeURIComponent(pathname)}`);
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch JSON');
  //         }
  //         const data = await response.json();
  //         setJson(data);
  //       } catch (err) {
  //         setError(err.message);
  //       }
  //     };

  //     fetchJson();
  //   }, [pathname]);

  //   if (error) {
  //     return <div>Error: {error}</div>;
  //   }

  //   if (!json) {
  //     return <div>Loading...</div>;
  //   }
  switch (true) {
    case pathname === '/content/dynamic/news':
      return <News />;
    case pathname === '/content/dynamic/news/create':
    case pathname.startsWith('/content/dynamic/news/edit'):
      return <RenderElement json={updateNewsJson} />;
    case pathname === '/content/dynamic/journals':
      return <Journals />;
    case pathname === '/content/dynamic/journals/create':
    case pathname.startsWith('/content/dynamic/journals/edit'):
      return <UpdateJournals />;
    default:
      return <div>Page not found</div>;
  }
};

const DynamicPage: React.FC = () => {
  const { location } = history;
  // Memoize Content component to prevent unnecessary re-renders
  const MemoizedContent = useMemo(
    () => <Content pathname={location.pathname} />,
    [location.pathname],
  );

  return <PageContainer>{MemoizedContent}</PageContainer>;
};

export default DynamicPage;
