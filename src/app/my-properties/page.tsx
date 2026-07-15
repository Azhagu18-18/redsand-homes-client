import type { Metadata } from "next";
import MyPropertiesClient from "./MyPropertiesClient";
export const metadata: Metadata = {
  title: "My Properties | RedSand Homes",
  description:
    "Manage all your property listings on RedSand Homes.",
};

export default function Page() {
  return <MyPropertiesClient />;
}