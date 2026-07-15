"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import adminService from "@/src/services/admin.service";
import PropertyTable, {
  AdminProperty,
} from "@/src/components/admin/PropertyTable";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const response =
        await adminService.getAllProperties();

      setProperties(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleView = (id: string) => {
  };

  const handleApprove = async (id: string) => {
    try {
      await adminService.approveProperty(id);

      toast.success("Property Approved");

      fetchProperties();
    } catch {
      toast.error("Approval Failed");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminService.rejectProperty(id);

      toast.success("Property Rejected");

      fetchProperties();
    } catch {
      toast.error("Reject Failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;

    try {
      await adminService.deleteProperty(id);

      toast.success("Property Deleted");

      fetchProperties();
    } catch {
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Property Management
        </h1>

        <p className="mt-2 text-gray-400">
          Manage all properties listed on RedSand Homes.
        </p>
      </div>

      <PropertyTable
        properties={properties}
        onView={handleView}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
      />
    </motion.main>
  );
}