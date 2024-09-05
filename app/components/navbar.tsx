import { cookies } from "next/headers";

export default async function Navbar() {
  async function logoutAction() {
    "use server";
    cookies().delete("userData");
    cookies().delete("token");
  }

  const user = cookies().get("userData");
  let username = "";

  if (user?.value) {
    username = JSON.parse(user?.value as string).username as string;
  }

  return (
    <div className=" px-5 py-2 border-b-2 border-gray-200 shadow-md flex justify-between w-full">
      <p>Jong Bingo</p>
      {username && (
        <div className="flex gap-2">
          {username}
          <form action={logoutAction}>
            <button type="submit">Logout</button>
          </form>
        </div>
      )}
    </div>
  );
}