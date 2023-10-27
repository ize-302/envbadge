import { eq, and, desc } from "drizzle-orm";
import { db } from "~/db";
import { projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const current_user = event.context.auth.user_id;
  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.user_id, current_user)));
  setResponseStatus(event, 204);
});
