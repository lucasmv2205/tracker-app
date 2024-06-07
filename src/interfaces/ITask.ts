import IProject from "./IProject";

export default interface ITask{
  secondsDuration: number,
  description: string,
  project: IProject,
  id: number
}