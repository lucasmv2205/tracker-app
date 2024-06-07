export enum NotificationType{
  SUCCESS,
  ERROR,
  WARNING
}

export default interface INotification{
  title: string,
  text: string,
  type: NotificationType,
  id: number
}