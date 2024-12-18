import { NextResponse } from "next/server";


export function middleware (request) {

    return NextResponse.redirect(new URL("/Login",request.url))

}

  

export const config = {

    matcher:[]
}