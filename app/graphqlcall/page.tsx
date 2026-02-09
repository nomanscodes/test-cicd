"use client";

import React, { useEffect, useState } from "react";
import { getUserGraphQL } from "../services/user.graphql";

const GraphqlCall = () => {
  const [user, setUsers] = useState({});

  useEffect(() => {
    getUserGraphQL(1).then((res: any) => setUsers(res?.data.user));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {user && (
        <>
          <div>ID: {user?.id}</div>
          <div>Name: {user?.name}</div>
          <div>Email: {user?.email}</div>
          <div>Phone: {user?.phone}</div>
        </>
      )}
    </div>
  );
};

export default GraphqlCall;
