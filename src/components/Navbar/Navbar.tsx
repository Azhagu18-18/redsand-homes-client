"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import {
  HiOutlineHome,
  HiOutlineBuildingOffice2,
  HiOutlinePlusCircle,
  HiOutlineHeart,
  HiOutlineUserCircle,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";
import favoriteService from "@/src/services/favorite.service";
import { HiHeart } from "react-icons/hi2";



const publicNavLinks = [
  {
    name: "Home",
    href: "/",
    icon: <HiOutlineHome size={20} />,
  },
  {
    name: "Properties",
    href: "/properties",
    icon: <HiOutlineBuildingOffice2 size={20} />,
  },
];

const privateNavLinks = [
  ...publicNavLinks,
  {
    name: "Add Property",
    href: "/add-property",
    icon: <HiOutlinePlusCircle size={20} />,
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: <HiOutlineHeart size={20} />,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
  if (!isAuthenticated) {
    setFavoriteCount(0);
    return;
  }

  const loadFavorites = async () => {
    try {
      const favorites = await favoriteService.getMyFavorites();
      setFavoriteCount(favorites.length);
    } catch (error) {
      console.error(error);
    }
  };

  loadFavorites();

  window.addEventListener("favorites-updated", loadFavorites);

  return () => {
    window.removeEventListener("favorites-updated", loadFavorites);
  };
}, [isAuthenticated]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
         isScrolled
            ? "bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,.35)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6">

          <div className="flex items-center justify-between h-24">

            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-3"
            >
             <div
  className="
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-2xl
    bg-gradient-to-br
    from-orange-500
    to-amber-500
    text-lg
    font-black
    text-white
    shadow-[0_10px_30px_rgba(249,115,22,.35)]
  "
>
  RS
</div>

              <div>
                <h1 className="text-xl font-bold text-white">
                  RedSand Homes
                </h1>

                <p className="text-xs text-white/60">
                  Find Your Dream Property
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}

            <nav className="hidden lg:flex items-center gap-4">

              {(isAuthenticated ? privateNavLinks : publicNavLinks).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 font-medium ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_10px_30px_rgba(249,115,22,.35)]"
                      : "text-white/70 hover:bg-white/5 hover:text-orange-300"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

            </nav>

            {/* Right Buttons */}

            <div className="hidden lg:flex items-center gap-6">
  {!isAuthenticated ? (
    <>
      <Link
        href="/login"
        className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold transition"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:brightness-110 text-white font-semibold shadow-md transition"
      >
        Register
      </Link>
    </>
  ) : (
   <div className="flex items-center gap-6">

  {/* Favorites */}

 <Link
  href="/favorites"
  className="group relative"
>
  <div
    className="
      relative
      w-12
      h-12
      rounded-2xl
      border
      border-white/10
      bg-white/5
      flex
      items-center
      justify-center
      transition
      duration-300
      group-hover:bg-orange-500/15
      group-hover:border-orange-500/30
    "
  >
    <HiOutlineHeart
      size={22}
      className="text-white group-hover:text-orange-400"
    />

    {favoriteCount > 0 && (
      <span
        className="
          absolute
          -top-2
          -right-2
          min-w-[22px]
          h-[22px]
          px-1
          rounded-full
          bg-gradient-to-r
          from-red-500
          to-rose-500
          text-[11px]
          font-bold
          text-white
          flex
          items-center
          justify-center
          shadow-lg
        "
      >
        {favoriteCount > 99 ? "99+" : favoriteCount}
      </span>
    )}
  </div>
</Link>

  {/* Profile */}

  <Link
    href="/profile"
    className="group"
  >
    <div className="flex flex-col items-center">

      <div
        className="
        w-8
        h-8
        mt-4
        rounded-full
        bg-gradient-to-br
        from-orange-500
        to-amber-500
        shadow-[0_10px_30px_rgba(249,115,22,.35)]
        flex
        items-center
        justify-center
        transition
        duration-300
        group-hover:scale-105
        "
      >
        <HiOutlineUserCircle
          size={16}
          className="text-white"
        />
      </div>

      <span
        className="
        mt-2
        text-sm
        font-semibold
        text-white/90
        group-hover:text-orange-300
        transition
        "
      >
        {user?.firstName}
      </span>

    </div>
  </Link>

  {/* Logout */}

  <button
    onClick={logout}
    className="
      px-6
      py-3
      rounded-2xl
      bg-gradient-to-r
      from-red-500
      to-rose-500
      hover:scale-105
      hover:shadow-[0_10px_30px_rgba(239,68,68,.35)]
      text-white
      font-semibold
      transition-all
      duration-300
    "
  >
    Logout
  </button>

</div>
  )}
</div>

            {/* Mobile Button */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden"
            >
              {mobileOpen ? (
                <HiOutlineXMark size={30} />
              ) : (
                <HiOutlineBars3 size={30} />
              )}
            </button>

          </div>

        </div>

        {/* Mobile Menu */}

        {mobileOpen && (
          <div className="lg:hidden bg-[#0b0b0b]/95
              backdrop-blur-2xl
              border-t border-white/10">

            <div className="px-6 py-6 space-y-2">

              {(isAuthenticated ? privateNavLinks : publicNavLinks).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    pathname === item.href
                      ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white"
                      : "hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-4">
  {!isAuthenticated ? (
    <>
      <Link
        href="/login"
        onClick={() => setMobileOpen(false)}
        className="text-center py-3 rounded-xl border border-white/10 bg-white/5 text-white font-semibold"
      >
        Login
      </Link>

      <Link
        href="/register"
        onClick={() => setMobileOpen(false)}
        className="text-center py-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-semibold"
      >
        Register
      </Link>
    </>
  ) : (
    <>
      <Link
        href="/profile"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/5"
      >
        <HiOutlineUserCircle size={22} />
        <span>{user?.firstName}</span>
      </Link>

      <button
        onClick={() => {
          logout();
          setMobileOpen(false);
        }}
        className="py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
      >
        Logout
      </button>
    </>
  )}
</div>

            </div>

          </div>
        )}
      </header>

      {/* Spacer */}

      <div className="h-24" />
    </>
  );
}