import { tasks } from "./tasks";
import timer from "./timer";

type timeSlot = {
  id: string;
  start: string;
  end: string;
  title: string;
  description: string;
  color: string;
  dateCreated: string;
  resetDate: string;
  timer: timer;
  tasks: tasks[];
};

export default timeSlot;
