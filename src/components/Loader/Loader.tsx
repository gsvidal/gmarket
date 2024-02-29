import "./Loader.scss";

type LoaderProps = {
  size?: "small" | "medium" | "large"
};

export const Loader = ({size = "large"}: LoaderProps): React.ReactNode => {
  return (
    <div className={`lds-ellipsis ${size}`} data-testid="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
