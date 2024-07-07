import { createStyles, css } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  const customStyles = css`
    color: white;
    background-color: ${token?.colorSuccess};
    border-color: ${token?.colorSuccessBorderHover};
    &:hover {
      color: ${token?.colorSuccess}!important;
      background-color: ${token?.colorSuccessBg}!important; // Use Ant Design tokens
      border-color: ${token?.colorSuccessHover}!important; // Use Ant Design tokens
    }
  `;
  const footerStyles = css`
    display: flex;
    align-items: center;
    justify-content: end;
  `;

  return {
    custom: customStyles,
    footer: footerStyles,
  };
});

export default useStyles;
