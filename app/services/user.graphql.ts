import { graphqlApi } from "../lib/axios";

export const getUserGraphQL = async (id: number) => {
  const query = `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
        phone
      }
    }
  `;

  const res = await graphqlApi.post("", {
    query,
    variables: { id },
  });

  return res.data;
};
