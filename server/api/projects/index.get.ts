import { db } from "~/db";
import { projects } from "~/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const result = await db.select().from(projects);
    setResponseStatus(event, 200);
    return { items: result };
  } catch (error) {
    console.log(error);
  }
});
