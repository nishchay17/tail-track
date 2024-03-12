import { getDate } from "@/lib/utils";
import { RetrieveDaysReturnType } from "@/util/analytics";

export const mockTracker = Array(7)
  .fill(0)
  .map((_, idx) => ({
    date: getDate(idx),
    events: [
      { '{"country":"us"}': 1 },
      { '{"country":"india","test":"hello"}': 1 },
      { '{"country":"india","test":"s"}': 1 },
      { "{}": 3 },
      { '{"country":"india"}': 2 },
    ],
  }))
  .reverse() as unknown as RetrieveDaysReturnType;
