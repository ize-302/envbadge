import { eq } from "drizzle-orm";
import { db } from "~/db";
import { environments } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { project_id } = query;
  const body = await readBody(event);

  await db.insert(environments).values({
    ...body,
    project_id: project_id,
  });
  setResponseStatus(event, 201);
});
