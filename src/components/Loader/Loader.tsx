import "./Loader.scss";

type LoaderProps = {};

export const Loader = ({}: LoaderProps): React.ReactNode => {
  return (
    <div className="lds-ellipsis" data-testid="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
