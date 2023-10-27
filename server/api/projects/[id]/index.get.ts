import { and, eq } from "drizzle-orm";
import { db } from "~/db";
import { projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const current_user = event.context.auth.user_id;
  const result = await db.query.projects.findFirst({
    where: and(eq(projects.user_id, current_user), eq(projects.id, id)),
  });
  return result;
});
