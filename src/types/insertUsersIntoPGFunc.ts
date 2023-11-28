// With God's Help

import { boolean } from "joi";
import { QueryResult } from "pg";

export type insertUsersIntoPGFunc = (
  values: [string, string, boolean]
) => Promise<void>;
