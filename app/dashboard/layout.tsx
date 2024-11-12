import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProviders from "../QueryProviders";
import Sidebar from "../../components/Sidebar";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/nextauth";
import prisma from "@/lib/prisma";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Progress from "../Progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | PENTAHEX",
  description: "Dashboard PENTAHEX",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = await prisma.users.findUnique({
    where: {
      username: session?.user?.name || "",
    },
  });

  return (
    <html lang="en">
      <QueryProviders>
        <body className={inter.className}>
          <Progress />
          <ToastContainer />
          <div>
            <Sidebar session={user}>{children}</Sidebar>
          </div>
        </body>
      </QueryProviders>
    </html>
  );
}
