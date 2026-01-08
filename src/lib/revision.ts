import { createHash } from "crypto";
import {latestUpdate} from "@/lib/latestUpdate";

export const revision = createHash("sha256")
  .update(`${latestUpdate()?.toISOString()}`)
  .digest("hex");
