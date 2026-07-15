"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  HiOutlineUsers,
  HiOutlineHomeModern,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";

import StatCard from "@/src/components/admin/StatCard";
import adminService, {
  DashboardStats,
} from "@/src/services/admin.service";


export default function AdminDashboardPage() {

  const [dashboard, setDashboard] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response =
          await adminService.getDashboard();

        setDashboard(response.data);

      } catch (error) {

        console.error(
          "Dashboard loading failed",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchDashboard();

  }, []);


  if (loading) {

    return (
      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#070707]
        text-white
      ">
        Loading Dashboard...
      </div>
    );

  }


  return (

    <main className="min-h-screen bg-[#070707]">

      <motion.div
        initial={{
          opacity:0,
          y:20,
        }}
        animate={{
          opacity:1,
          y:0,
        }}
        transition={{
          duration:0.4,
        }}
      >


        <h1 className="
          text-4xl
          font-bold
          text-white
        ">
          Dashboard
        </h1>


        <p className="
          mt-2
          text-gray-400
        ">
          Welcome back, Administrator 👋
        </p>



        {/* Stats */}

        <section className="
          mt-10
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-5
        ">


          <StatCard
            title="Total Users"
            value={
              dashboard?.totalUsers ?? 0
            }
            icon={HiOutlineUsers}
          />


          <StatCard
            title="Total Properties"
            value={
              dashboard?.totalProperties ?? 0
            }
            icon={HiOutlineHomeModern}
          />


          <StatCard
            title="Pending"
            value={
              dashboard?.pendingProperties ?? 0
            }
            icon={HiOutlineClock}
          />


          <StatCard
            title="Approved"
            value={
              dashboard?.approvedProperties ?? 0
            }
            icon={HiOutlineCheckCircle}
          />


          <StatCard
            title="Rejected"
            value={
              dashboard?.rejectedProperties ?? 0
            }
            icon={HiOutlineXCircle}
          />


        </section>




        {/* Recent Properties */}

        <section className="
          mt-10
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-6
        ">


          <h2 className="
            mb-5
            text-xl
            font-semibold
            text-white
          ">
            Recent Properties
          </h2>


          {
            dashboard?.recentProperties?.length ? (

              <div className="space-y-3">

                {
                  dashboard.recentProperties.map(
                    (property:any)=>(
                      
                    <div
                      key={property.id}
                      className="
                        flex
                        justify-between
                        rounded-xl
                        border
                        border-white/10
                        bg-black/30
                        p-4
                      "
                    >

                      <div>

                        <h3 className="
                          font-semibold
                          text-white
                        ">
                          {property.title}
                        </h3>


                        <p className="
                          text-sm
                          text-gray-400
                        ">
                          {property.owner_name}
                        </p>

                      </div>


                      <span className="
                        rounded-full
                        bg-orange-500/20
                        px-4
                        py-2
                        text-sm
                        text-orange-400
                      ">
                        {property.status}
                      </span>


                    </div>

                  ))
                }

              </div>

            ) : (

              <p className="text-gray-500">
                No properties found
              </p>

            )
          }


        </section>




        {/* Recent Users */}

        <section className="
          mt-8
          rounded-2xl
          border
          border-white/10
          bg-white/5
          p-6
        ">


          <h2 className="
            mb-5
            text-xl
            font-semibold
            text-white
          ">
            Recent Users
          </h2>


          {
            dashboard?.recentUsers?.length ? (

              <div className="space-y-3">

                {
                  dashboard.recentUsers.map(
                    (user:any)=>(
                      
                    <div
                      key={user.id}
                      className="
                        flex
                        justify-between
                        rounded-xl
                        border
                        border-white/10
                        bg-black/30
                        p-4
                      "
                    >

                      <div>

                        <h3 className="
                          font-semibold
                          text-white
                        ">
                          {user.first_name} {user.last_name}
                        </h3>


                        <p className="
                          text-sm
                          text-gray-400
                        ">
                          {user.email}
                        </p>

                      </div>


                      <span className="
                        rounded-full
                        bg-white/10
                        px-4
                        py-2
                        text-sm
                        text-gray-300
                      ">
                        {user.role}
                      </span>


                    </div>

                  ))
                }

              </div>

            ) : (

              <p className="text-gray-500">
                No users found
              </p>

            )
          }


        </section>



      </motion.div>

    </main>

  );
}