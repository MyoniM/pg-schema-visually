// styles
import classes from './errorView.module.css';

interface IProps {
  message: string;
}

export default function ErrorView({ message }: IProps) {
  return (
    <div className={classes.errorWrapper}>
      <p>There was a problem while generating schema view:</p>
      <textarea className={classes.errorMessage} value={message} readOnly />
    </div>
  );
}
