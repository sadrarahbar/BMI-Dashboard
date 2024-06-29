import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    optional: {
      color: token.colorTextSecondary,
      fontStyle: 'normal',
    },
    // rangePicker: {
    //   color: 'red',
    // },
  };
});

export default useStyles;
