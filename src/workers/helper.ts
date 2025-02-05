import dayjs from "dayjs";
import { store } from "../store";


  export const CreateUniqueIdChar = () => {
    let id = new Date().getTime().toString(36)
    return id;
  }
