import { desc, eq } from "drizzle-orm";
import { db } from "~/db";
import { projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const current_user = event.context.auth.user_id;
  const result = await db.query.projects.findMany({
    orderBy: [desc(projects.last_updated)],
    where: eq(projects.user_id, current_user),
  });
  return result;
});
