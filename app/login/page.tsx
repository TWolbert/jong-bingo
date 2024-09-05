import sql from "@/db";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
    async function loginAction(formData: FormData) {
        "use server";
        // Check if user exists
        const user = await sql`SELECT * FROM jongbingo."user" WHERE username = ${String(formData.get("username"))}`;

        if (user.length === 0) {
            console.log("User does not exist");
            return;
        }

        const password = user[0].password;
        const isPasswordCorrect = await compare(String(formData.get("password")), password);

        if (!isPasswordCorrect) {
            console.log("Incorrect password");
            return;
        }
        else {
            let token = "";
            const timeBase64 = Buffer.from(String(Date.now())).toString('base64');
            const usernameBase64 = Buffer.from(String(formData.get("username"))).toString('base64');
            token = `${timeBase64}.${usernameBase64}`;

            await sql`INSERT INTO jongbingo."token" (token, userId) VALUES (${token}, ${user[0].id})`;

            cookies().set('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7
            });

            cookies().set('userData', JSON.stringify(user[0]), {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7
            });
            
            redirect('/home')
        }
     }

    return (
        <div>
            <form action={loginAction}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
                <Link href="/register">Register</Link>
            </form>
        </div>
    )
}