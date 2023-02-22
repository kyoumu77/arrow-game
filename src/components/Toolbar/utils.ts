import { format } from "date-fns";
import { Action } from "../../types";

import { TIME_FORMAT } from "../../constants";

export const getActionTooltip = ({ result, createdAt }: Action) =>
  `${result} at ${format(createdAt, TIME_FORMAT)}`;
