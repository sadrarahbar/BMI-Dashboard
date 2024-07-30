import { createStyles, css } from 'antd-style';
const useStyles = createStyles(({ token }) => {
  const tableItemStyles = css`
    white-space: nowrap; /* Prevent wrapping to next line */
    overflow: hidden; /* Hide overflowing content */
    text-overflow: ellipsis; /* Show ellipsis (...) */
    width: 100px; /* Set desired width for the paragraph */
  `;

  return {
    tableItem: tableItemStyles,
  };
});

export default useStyles;
