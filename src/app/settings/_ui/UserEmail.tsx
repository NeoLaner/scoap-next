"use client";
import { useUserData } from "~/app/_hooks/useUserData";

function UserEmail() {
  const { userData } = useUserData();
  return <p>{userData.email}</p>;
}

export default UserEmail;
