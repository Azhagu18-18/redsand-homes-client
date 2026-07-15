"use client";

import {
  HiOutlineEye,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "USER" | "ADMIN";
}

interface UserTableProps {
  users: AdminUser[];
  onView: (id: string) => void;
  onChangeRole: (
    id: string,
    role: "USER" | "ADMIN"
  ) => void;
}

export default function UserTable({
  users,
  onView,
  onChangeRole,
}: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
      <table className="min-w-full">

        <thead className="border-b border-white/10 bg-black/30">
          <tr>
            <th className="px-6 py-4 text-left text-sm text-gray-400">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm text-gray-400">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm text-gray-400">
              Role
            </th>

            <th className="px-6 py-4 text-center text-sm text-gray-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-16 text-center text-gray-500"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="px-6 py-5 text-white font-medium">
                  {user.first_name} {user.last_name}
                </td>

                <td className="px-6 py-5 text-gray-400">
                  {user.email}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onView(user.id)}
                      className="rounded-lg bg-blue-500/20 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                    >
                      <HiOutlineEye />
                    </button>

                    <button
                      onClick={() =>
                        onChangeRole(
                          user.id,
                          user.role === "ADMIN"
                            ? "USER"
                            : "ADMIN"
                        )
                      }
                      className="rounded-lg bg-orange-500/20 p-2 text-orange-400 transition hover:bg-orange-500 hover:text-white"
                    >
                      <HiOutlinePencilSquare />
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