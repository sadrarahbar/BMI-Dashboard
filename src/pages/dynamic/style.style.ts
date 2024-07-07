import { createStyles, css } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  const baseButtonStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    cursor: pointer;
    font-size: '14px';
    transition: all 0.2s ease-in-out;
  `;

  const viewButtonStyles = css`
    ${baseButtonStyles};
    color: ${token?.colorInfo};
    border-color: ${token?.colorInfoBorder}; // Use Ant Design tokens
    &:hover {
      color: white !important;
      background-color: ${token?.colorInfo}!important;
      border-color: ${token?.colorInfoBorderHover}!important;
    }
  `;
  const editButtonStyles = css`
    ${baseButtonStyles};
    color: ${token?.colorSuccess};
    border-color: ${token?.colorSuccessHover}; // Use Ant Design tokens
    &:hover {
      color: white !important;
      background-color: ${token?.colorSuccess}!important;
      border-color: ${token?.colorSuccessHover}!important;
    }
  `;

  const deleteButtonStyles = css`
    ${baseButtonStyles};
    color: ${token?.colorError};
    border-color: ${token?.colorErrorBorder}; // Use Ant Design tokens
    &:hover {
      color: white !important;
      background-color: ${token?.colorError}!important;
      border-color: ${token?.colorErrorBorderHover}!important;
    }
  `;

  const addButtonStyles = css`
    color: white;
    background-color: ${token?.colorSuccess};
    border-color: ${token?.colorSuccessBorderHover};
    &:hover {
      color: ${token?.colorSuccess}!important;
      background-color: ${token?.colorSuccessBg}!important; // Use Ant Design tokens
      border-color: ${token?.colorSuccessHover}!important; // Use Ant Design tokens
    }
  `;
  const tableItemStyles = css`
    white-space: nowrap; /* Prevent wrapping to next line */
    overflow: hidden; /* Hide overflowing content */
    text-overflow: ellipsis; /* Show ellipsis (...) */
    width: 100px; /* Set desired width for the paragraph */
  `;

  return {
    viewButton: viewButtonStyles,
    editButton: editButtonStyles,
    deleteButton: deleteButtonStyles,
    addButton: addButtonStyles,
    tableItem: tableItemStyles,
  };
});

export default useStyles;
