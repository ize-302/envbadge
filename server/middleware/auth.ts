import { getToken } from "#auth";

export default eventHandler(async (event) => {
  const token = await getToken({ event });
  event.context.auth = { user_id: token?.sub };
});
