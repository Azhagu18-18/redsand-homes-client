"use client";

import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

interface OwnerInfoCardProps {
  owner: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
  };
}

export default function OwnerInfoCard({
  owner,
}: OwnerInfoCardProps) {
  const fullName = `${owner.first_name} ${owner.last_name}`;

  return (
    <section className="mt-10 rounded-2xl border border-white/10 bg-[#111111] p-8">
      <h2 className="mb-8 text-2xl font-bold text-white">
        Owner Information
      </h2>

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Owner Details */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-orange-500/10 p-3">
              <HiOutlineUser className="h-7 w-7 text-orange-400" />
            </div>

            <div>
              <p className="text-sm text-gray-400">Owner</p>
              <p className="text-lg font-semibold text-white">
                {fullName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-300">
            <HiOutlineEnvelope className="h-5 w-5 text-orange-400" />
            <span>{owner.email}</span>
          </div>

          {owner.phone && (
            <div className="flex items-center gap-3 text-gray-300">
              <HiOutlinePhone className="h-5 w-5 text-orange-400" />
              <span>{owner.phone}</span>
            </div>
          )}
        </div>

        {/* Contact Button */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="
              flex items-center justify-center gap-2
              rounded-xl
              bg-orange-500
              px-6
              py-3
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-orange-600
            "
          >
            <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
            Contact Owner
          </button>

          <p className="max-w-xs text-center text-sm text-gray-500">
            Contact details are available only for registered users.
          </p>
        </div>
      </div>
    </section>
  );
}