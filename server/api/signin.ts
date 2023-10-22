import axios from "axios";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { code } = query;
  if (!code) {
    setResponseStatus(event, 401);
    return {
      success: false,
      message: "Error: no code",
    };
  }

  let response = await axios.post(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  await sendRedirect(
    event,
    `/dashboard?accessToken=${response.data.access_token}`,
    302
  );
});
