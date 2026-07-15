"use client";

import {
  HiOutlineEye,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrash,
} from "react-icons/hi2";

interface Property {
  id: string;
  title: string;
  owner_name: string;
  price: number;
  status: string;
}

interface PropertyTableProps {
  properties: Property[];
}

export default function PropertyTable({
  properties,
}: PropertyTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">

      <table className="w-full">

        <thead className="border-b border-white/10 bg-black/40">

          <tr className="text-left text-sm uppercase tracking-wide text-gray-400">

            <th className="px-6 py-4">Property</th>

            <th className="px-6 py-4">Owner</th>

            <th className="px-6 py-4">Price</th>

            <th className="px-6 py-4">Status</th>

            <th className="px-6 py-4 text-center">
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
                <td className="px-6 py-5 font-semibold text-white">
                  {property.title}
                </td>

                <td className="px-6 py-5 text-gray-400">
                  {property.owner_name}
                </td>

                <td className="px-6 py-5 text-white">
                  ₹ {property.price.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-400">
                    {property.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">

                    <button className="rounded-lg bg-blue-500/20 p-2 text-blue-400 transition hover:bg-blue-500 hover:text-white">
                      <HiOutlineEye />
                    </button>

                    <button className="rounded-lg bg-green-500/20 p-2 text-green-400 transition hover:bg-green-500 hover:text-white">
                      <HiOutlineCheckCircle />
                    </button>

                    <button className="rounded-lg bg-yellow-500/20 p-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-white">
                      <HiOutlineXCircle />
                    </button>

                    <button className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500 hover:text-white">
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