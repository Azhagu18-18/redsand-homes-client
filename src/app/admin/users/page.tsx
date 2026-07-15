"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import adminService from "@/src/services/admin.service";
import UserTable, {
  AdminUser,
} from "@/src/components/admin/UserTable";

export default function AdminUsersPage() {
const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("ALL");

  const ITEMS_PER_PAGE = 10;

const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await adminService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = (id: string) => {
  router.push(`/admin/users/${id}`);
};

  const handleChangeRole = async (
    id: string,
    role: "USER" | "ADMIN"
  ) => {
    try {
      await adminService.updateUserRole(id, role);

      toast.success("User role updated.");

      fetchUsers();
    } catch {
      toast.error("Failed to update role.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-white">
        Loading Users...
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          User Management
        </h1>

        <p className="mt-2 text-gray-400">
          Manage all registered users.
        </p>
      </div>

      <UserTable
        users={users}
        onView={handleView}
        onChangeRole={handleChangeRole}
      />
    </motion.main>
  );
}