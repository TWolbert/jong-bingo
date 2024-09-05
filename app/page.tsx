import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      Please sign in to continue
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  );
}
