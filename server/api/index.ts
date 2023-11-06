import { eq, and } from "drizzle-orm";
import { db } from "~/db";
import { environments, projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  });

  const query = getQuery(event);
  const { id, from } = query;

  if (!id || !from) {
    return setResponseStatus(event, 405, "not allowed");
  }

  const projectresult = await db.query.projects.findFirst({
    where: and(eq(projects.id, id as string)),
  });
  if (!projectresult) {
    return setResponseStatus(event, 404, "Project not found");
  }

  const environmentresult = await db.query.environments.findFirst({
    where: and(
      eq(environments.project_id, id as string),
      eq(environments.url, from as string)
    ),
  });
  if (!environmentresult) {
    return setResponseStatus(event, 404, "Environment not found");
  }

  return {
    ...environmentresult,
    badge_style: projectresult.badge_style,
    badge_position: projectresult.badge_position,
  };
});
