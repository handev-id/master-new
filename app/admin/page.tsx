// app/user-management/page.tsx
import React from "react";
import prisma from "@/lib/prisma";
import Layout from "../dashboard/components/Layout";
import Modal from "./components/Modal";

// Fungsi untuk mengambil data user
const getUsers = async (search: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;

  // Query Prisma
  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where: {
        OR: [
          { username: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.users.count({
      where: {
        OR: [
          { username: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  return { users, total };
};

const UserManagement = async ({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) => {
  const search = searchParams.search || ""; // Default pencarian kosong
  const page = parseInt(searchParams.page || "1", 10); // Default halaman ke-1
  const limit = 10; // Jumlah data per halaman

  const { users, total } = await getUsers(search, page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <Layout title="User Management">
      {/* Search Bar */}
      <form method="get" className="my-4">
        <input
          type="text"
          name="search"
          placeholder="Search by Username or Email"
          defaultValue={search}
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {/* Table */}
      <table className="w-full text-white/60 rounded my-6 overflow-x-scroll">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 px-5">Username</th>
            <th className="text-left p-3 px-5">Email</th>
            <th className="text-left p-3 px-5">PhoneNumber</th>
            <th className="text-left p-3 px-5">Balance</th>
            <th className="text-left p-3 px-5">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3 px-5">{user.username}</td>
                <td className="p-3 px-5">{user.email}</td>
                <td className="p-3 px-5">{user.phoneNumber}</td>
                <td className="p-3 px-5">${user.balance}</td>
                <td className="p-3 px-5">
                  <Modal
                    username={user.username}
                    id={user.id}
                    date={new Date(user.createdAt).toLocaleDateString()}
                    reffCode={user.reffCode}
                    country={user.country}
                    bonus={user.bonus || 0}
                    profits={user.profits || 0}
                    refferers={user.referrers}
                    reffer={user.referrer}
                    rekeningName={user.rekeningName || ""}
                    rekeningNumber={user.rekeningNumber || ""}
                    bankName={user.bankName || ""}
                    email={user.email}
                    phoneNumber={user.phoneNumber}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-3 px-5 text-center">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <a
            key={i}
            href={`?search=${search}&page=${i + 1}`}
            className={`p-2 px-4 rounded ${
              page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-white/60 hover:bg-gray-700"
            }`}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </Layout>
  );
};

export default UserManagement;
