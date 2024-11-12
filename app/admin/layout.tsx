import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProviders from "../QueryProviders";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";
import AdminSidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Progress from "../Progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin | PENTAHEX",
  description: "Dashboard PENTAHEX",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.name !== "adminmaster99") return redirect("/404");
  const user = await prisma.users.findUnique({
    where: {
      username: session?.user?.name || "",
    },
  });

  return (
    <QueryProviders>
      <html lang="en">
        <body className={inter.className}>
          <Progress />
          <ToastContainer />
          <AdminSidebar session={user}>{children}</AdminSidebar>
        </body>
      </html>
    </QueryProviders>
  );
}
