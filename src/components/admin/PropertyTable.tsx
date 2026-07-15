"use client";

import {
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrash,
} from "react-icons/hi2";

export interface AdminProperty {
  id: string;
  title: string;
  owner_name: string;
  price: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface PropertyTableProps {
  properties: AdminProperty[];
  onView: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PropertyTable({
  properties,
  onView,
  onApprove,
  onReject,
  onDelete,
}: PropertyTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
      <table className="min-w-full">
        <thead className="border-b border-white/10 bg-black/30">
          <tr>
            <th className="px-6 py-4 text-left text-sm text-gray-400">
              Property
            </th>

            <th className="px-6 py-4 text-left text-sm text-gray-400">
              Owner
            </th>

            <th className="px-6 py-4 text-left text-sm text-gray-400">
              Price
            </th>

            <th className="px-6 py-4 text-left text-sm text-gray-400">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm text-gray-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {properties.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-16 text-center text-gray-500"
              >
                No properties found.
              </td>
            </tr>
          ) : (
            properties.map((property) => (
              <tr
                key={property.id}
                className="border-b border-white/5 transition hover:bg-white/5"
              >
                <td className="px-6 py-5">
                  <h3 className="font-semibold text-white">
                    {property.title}
                  </h3>
                </td>

                <td className="px-6 py-5 text-gray-300">
                  {property.owner_name}
                </td>

                <td className="px-6 py-5 text-white">
                  ₹ {property.price.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      property.status === "APPROVED"
                        ? "bg-green-500/20 text-green-400"
                        : property.status === "REJECTED"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {property.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onView(property.id)}
                      className="rounded-lg bg-blue-500/20 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                    >
                      <HiOutlineEye />
                    </button>

                    <button
                      onClick={() => onApprove(property.id)}
                      className="rounded-lg bg-green-500/20 p-2 text-green-400 transition hover:bg-green-500 hover:text-white"
                    >
                      <HiOutlineCheckCircle />
                    </button>

                    <button
                      onClick={() => onReject(property.id)}
                      className="rounded-lg bg-yellow-500/20 p-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
                    >
                      <HiOutlineXCircle />
                    </button>

                    <button
                      onClick={() => onDelete(property.id)}
                      className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}