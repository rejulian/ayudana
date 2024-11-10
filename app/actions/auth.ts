"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(prevState: any, formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    if (!data.email || !data.password) {
        return { error: "Complete todos los campos" }
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error && error.code === 'invalid_credentials') {
        console.log(error);
        return { error: "Credenciales invalidas." }
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function signup(prevState: any, formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                full_name: `${firstName + " " + lastName}`,
                email: formData.get("email") as string,
            },
        },
    };

    if (!firstName || !lastName || !email || !password) {
        return { error: "Complete todos los campos" }
    }


    const { error } = await supabase.auth.signUp(data);

    if (error && error.code == "weak_password") {
        console.log(error);
        return { error: "Contraseña debil." }
    }


    revalidatePath("/", "layout");
    redirect("/");
}

export async function signout() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error);
        throw new Error("Error al cerrar sesion")
    }

    // redirect("/");
}

export async function signInWithGoogle() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
        },
    });

    if (error) {
        console.log(error);
        throw new Error("Error al inicari sesion con Google, intenta nuevamente mas tarde.")
    }

    redirect(data.url);
}