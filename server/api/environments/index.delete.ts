import { eq } from "drizzle-orm";
import { db } from "~/db";
import { environments } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { environment_id } = query;
  await db
    .delete(environments)
    .where(eq(environments.id, environment_id as string));
  setResponseStatus(event, 204);
});
