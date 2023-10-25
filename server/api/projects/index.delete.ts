import { eq, and, desc } from "drizzle-orm";
import { db } from "~/db";
import { projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const slug: any = event.context.params.slug;
  const current_user = event.context.auth.user_id;
  await db
    .delete(projects)
    .where(and(eq(projects.id, slug), eq(projects.user_id, current_user)));
  setResponseStatus(event, 204);
});
