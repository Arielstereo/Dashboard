"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUserStore from "@/store/UserStore";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }) => {
  const router = useRouter();

  const userProfile = useUserStore((state) => state.user);
  console.log(userProfile);
  const setUserProfile = useUserStore((state) => state.setUser);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/api/auth/profile");
        setUserProfile(res.data.profile);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userLogout = async () => {
    const res = await axios.delete("/api/auth/logout");
    if (res.status === 200) {
      router.push("/");
    }
  };

  const avatarText = userProfile?.username?.slice(0, 1).toUpperCase();

  return (
    <section className="m-6">
      <Sidebar
        userProfile={userProfile}
        avatarText={avatarText}
        userLogout={userLogout}
      />
      {children}
    </section>
  );
};

export default Layout;
