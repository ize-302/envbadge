import { eq, and } from "drizzle-orm";
import { db } from "~/db";
import { environments } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { project_id, environment_id } = query;
  const body = await readBody(event);

  console.log(body);
  await db
    .update(environments)
    .set(body)
    .where(
      and(
        eq(environments.project_id, project_id),
        eq(environments.id, environment_id)
      )
    );
  setResponseStatus(event, 204);
});
