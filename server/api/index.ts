export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  });

  const query = getQuery(event);
  const { id, from } = query;
  return "It works!";
});
