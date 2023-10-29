import { eq, desc } from "drizzle-orm";
import { db } from "~/db";
import { environments } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { project_id } = query;

  const result = await db.query.environments.findMany({
    orderBy: [desc(environments.created_at)],
    where: eq(environments.project_id, project_id as string),
  });
  return result;
});
