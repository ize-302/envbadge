import { eq, and } from "drizzle-orm";
import { db } from "~/db";
import { environments } from "~/db/schema";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  });

  const query = getQuery(event);
  const { id, from } = query;

  if (!id || !from) {
    return setResponseStatus(event, 405, "not allowed");
  }

  const result = await db.query.environments.findFirst({
    where: and(
      eq(environments.project_id, id as string)
      // eq(environments.url, from as string)
    ),
  });
  if (!result) {
    return setResponseStatus(event, 404, "Environment not found");
  }

  return result;
});
