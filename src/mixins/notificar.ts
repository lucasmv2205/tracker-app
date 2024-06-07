import { NotificationType } from "@/interfaces/INotification";
import { NOTIFY } from "@/store/type-mutations";
import { store } from '@/store'

export const notificacaoMixin = {
  methods: {
    notify(type: NotificationType, title: string, text: string): void {
      store.commit(NOTIFY, {
        title: title,
        text: text,
        type: type,
      });
    },
  },
};
