import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/type-mutations";

type Notifier = {
  notify: (type: NotificationType, title: string, text: string) => void;
};

export default (): Notifier => {
  const notify = (
    type: NotificationType,
    title: string,
    text: string
  ): void => {
    store.commit(NOTIFY, {
      title: title,
      text: text,
      type: type,
    });
  };

  return {
    notify
  }
};
