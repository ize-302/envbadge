import { and, eq } from "drizzle-orm";
import { db } from "~/db";
import { projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug;
  const current_user = event.context.auth.user_id;
  const result = await db.query.projects.findFirst({
    where: and(eq(projects.user_id, current_user), eq(projects.id, slug)),
  });
  return result;
});
