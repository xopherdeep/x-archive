"use client";
import dynamic from "next/dynamic";
const ClientBodyFixer = dynamic(() => import("@/components/ClientBodyFixer"), { ssr: false });
export default function ClientBodyFixerWrapper() {
  return <ClientBodyFixer />;
}
