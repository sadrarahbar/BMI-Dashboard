import { Tiny } from '@ant-design/plots';
import React from 'react';

const DemoRing = () => {
  const percent = 0.7;
  const config = {
    percent,
    width: 100,
    height: 100,
    color: ['#E8EFF5', '#66AFF4'],
    annotations: [
      {
        type: 'text',
        style: {
          text: `${percent * 100}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return <Tiny.Ring {...config} />;
};

export default DemoRing;
