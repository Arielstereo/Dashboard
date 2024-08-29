"use client";

import CardBank from "@/components/CardBank";
import Chart from "@/components/Chart";
import DrawerComponent from "@/components/Drawer";
import UpdateForm from "@/components/UpdateForm";
import useBalanceStore from "@/store/BalanceStore";
import useUserStore from "@/store/UserStore";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const setOperations = useBalanceStore((state) => state.setOperations);
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);

  const getOperations = async () => {
    try {
      const { id } = user;
      const res = await axios.get(`/api/operation/${id}`);
      setOperations(res.data.balance);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getOperations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex flex-col mt-8 mx-8 sm:mx-32">
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
        <div className="flex gap-4">
          <DrawerComponent getOperations={getOperations} />
          <UpdateForm />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center sm:gap-6">
        <div className="sm:w-1/3 mt-32">
          <Chart isLoading={isLoading} />
        </div>
        <div className="sm:w-1/2 mt-32">
          <CardBank isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
