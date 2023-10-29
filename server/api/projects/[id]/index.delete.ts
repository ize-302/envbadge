import { eq, and, desc } from "drizzle-orm";
import { db } from "~/db";
import { projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const current_user = event.context.auth.user_id;
  await db
    .delete(projects)
    .where(
      and(eq(projects.id, id as string), eq(projects.user_id, current_user))
    );
  setResponseStatus(event, 204);
});
