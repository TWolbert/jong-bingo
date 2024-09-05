import sql from "@/db";
import { hash } from "bcrypt";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Register() {
    async function registerAction(formData: FormData) {
        "use server";
        // Check if user exists
        const user = await sql`SELECT * FROM jongbingo."user" WHERE username = ${String(formData.get("username"))}`;

        if (user.length !== 0) {
            console.log("user already exists");
            return;
        }

        const encryptedPassword = await hash(String(formData.get("password")), 10);

        await sql`INSERT INTO jongbingo."user" (username, password) VALUES (${String(formData.get("username"))}, ${encryptedPassword})`;
        
        // Redirect to login page
        redirect('/login')
     }

    return (
        <div>
            <form action={registerAction}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Register</button>
                <Link href="/login">Login</Link>
            </form>
        </div>
    )
}