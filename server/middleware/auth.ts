import { getToken } from "#auth";

export default eventHandler(async (event) => {
  const token = await getToken({ event });
  if (!token) {
    console.log("no token");
  } else {
    event.context.auth = { user_id: token.sub };
  }
});
