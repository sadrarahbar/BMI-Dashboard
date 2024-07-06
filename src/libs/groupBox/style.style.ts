import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    groupBox: {
      position: 'relative',
      paddingBottom: '1.5rem',
      paddingTop: '0.7rem',
    },

    heading: {
      position: 'absolute',
      top: '0rem',
      right: '1rem',
      background: 'white',
      padding: '0 0.8rem',
    },
    content: {
      border: '1px solid #d9d9d9',
      borderRadius: '0.5rem',
      padding: '1rem 1rem 0',
    },
    required: {
      color: 'red',
      marginRight: '0.3rem',
      fontSize: '0.7rem',
    },
  };
});

export default useStyles;
