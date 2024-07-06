import useStyles from '../groupBox/style.style';
interface Props {
  title: string;
  children: any;
  required: boolean;
}

const GroupBox = ({ title, children, required }: Props) => {
  const { styles } = useStyles();
  return (
    <div className={styles.groupBox}>
      <div className={styles.heading}>
        <span>{title}</span>
        <span className={styles.required}>{required && '*'}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default GroupBox;
