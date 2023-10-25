import { db } from "~/db";
import { projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const current_user = event.context.auth.user_id;
  await db.insert(projects).values({
    ...body,
    user_id: current_user,
  });
  setResponseStatus(event, 201);
});
