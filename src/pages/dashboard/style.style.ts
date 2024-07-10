import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    pageHeaderContent: {
      display: 'flex',
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        display: 'block',
      },
    },
    avatar: {
      flex: '0 1 72px',
      '& > span': {
        display: 'block',
        width: '72px',
        height: '72px',
        borderRadius: '72px',
      },
    },
    content: {
      position: 'relative',
      top: '4px',
      flex: '1 1 auto',
      marginLeft: '24px',
      color: token.colorTextSecondary,
      lineHeight: '22px',
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        marginLeft: '0',
      },
    },
    contentTitle: {
      marginBottom: '12px',
      color: token.colorTextHeading,
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '28px',
    },
    extraContent: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      whiteSpace: 'nowrap',
    },
    statItem: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 15px',
      '> p:first-child': {
        marginBottom: '4px',
        color: token.colorTextSecondary,
        fontSize: token.fontSize,
        lineHeight: '22px',
      },
      '> p': {
        margin: '0',
        color: token.colorTextHeading,
        fontSize: '25px',
        lineHeight: '35px',
        '> span': {
          color: token.colorTextSecondary,
          fontSize: '18px',
        },
      },
      '&::after': {
        position: 'absolute',
        top: '8px',
        right: '0',
        width: '1px',
        height: '40px',
        backgroundColor: token.colorSplit,
        content: "''",
      },
      [`@media screen and (max-width: ${token.screenXL}px) and (min-width: @screen-lg)`]: {
        padding: '0 16px',
      },
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        padding: '0 16px',
        textAlign: 'left',
        '&::after': {
          display: 'none',
        },
      },
      [`@media screen and (max-width: ${token.screenSM}px)`]: { float: 'none' },
    },
  };
});

export default useStyles;
