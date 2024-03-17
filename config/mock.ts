import { getDate } from "@/lib/utils";
import { RetrieveDaysReturnType } from "@/util/analytics";

const randomCount = (idx: number) => [14, 7, 2, 18, 9, 10, 4][idx];

export const mockTracker = Array(7)
  .fill(0)
  .map((_, idx) => ({
    date: getDate(idx),
    events: [
      { '{"country":"us"}': randomCount(idx) },
      { '{"country":"india"}': randomCount(idx) },
      { "{}": randomCount(idx) },
      { '{"ref":"resume"}': randomCount(idx) },
    ],
  }))
  .reverse() as unknown as RetrieveDaysReturnType;
