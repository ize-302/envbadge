export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { id, from } = query;
  return "It works!";
});
