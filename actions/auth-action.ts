'use server';

import signIn  from "next-auth";

export async function signinAction() { //@ts-ignore
    await signIn("google")
}