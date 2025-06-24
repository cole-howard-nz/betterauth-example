import { NextRequest, NextResponse } from "next/server"
import { betterFetch } from "@better-fetch/fetch"
import type { auth } from "@/lib/auth/auth"

 
type Session = typeof auth.$Infer.Session
 
export async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get("cookie") || "" 
		}
	})
 
	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url))
	}
 
	return NextResponse.next()
}
 
// Apply middleware to specific routes
export const config = {
	matcher: ["/dashboard"]
}