import axios from "axios";

export default defineEventHandler(async (event) => {
  console.log("accessToken");
  const query = getQuery(event);
  const { accessToken } = query;
  let response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  setResponseStatus(event, 200);
  return response.data;
});
