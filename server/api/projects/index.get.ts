import { desc, eq, sql } from "drizzle-orm";
import { db } from "~/db";
import { projects, environments } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const current_user = event.context.auth.user_id;
  const all_projects = await db.query.projects.findMany({
    orderBy: [desc(projects.last_updated)],
    where: eq(projects.user_id, current_user),
  });

  const result = await Promise.all(
    all_projects.map(async (project) => {
      const environmentResults = await db
        .select({ count: sql<number>`count(*)` })
        .from(environments)
        .where(eq(environments.project_id, project.id));

      const data_obj = {
        ...project,
        environment_count: Number(environmentResults[0].count),
      };
      return data_obj;
    })
  );
  return result;
});
