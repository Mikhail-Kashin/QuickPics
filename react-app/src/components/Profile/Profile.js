import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  let { name } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/profiles/${name}`);
      const user = await response.json();
    })();
  }, [name]);



  return (
    <h1>
      { name }
    </h1>
  );
}
export default Profile;
