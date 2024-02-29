import { useSelector } from "react-redux";
import "./ToastNotification.scss";
import { AppStore } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearToastNotification } from "../../redux/states/toastNotification.slice";

export const ToastNotification = (): React.ReactNode => {
  const { notification } = useSelector((store: AppStore) => store.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(clearToastNotification());
    }, 6000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <>
      <div className={`toast toast--${notification.type}`}>
        <span
          className={`toast__icon toast__icon--${notification.type}`}
        ></span>
        <span className="toast__message">{notification.message}</span>
      </div>
    </>
  );
};
7;
