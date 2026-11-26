import { connection } from "next/server";

export default async function BanglaDate() {
  await connection();

  const date = new Date();
  const formatted = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return <p className="text-sm text-gray-500">{formatted}</p>;
}
