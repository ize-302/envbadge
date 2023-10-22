import axios from "axios";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { accessToken } = query;
  console.log("--->", accessToken);
  let response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  setResponseStatus(event, 200);
  return response.data;
});
