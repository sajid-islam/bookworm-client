import { NextResponse } from "next/server";

export function proxy(request) {
    const token = request.cookies.get("token")?.value;
    const user = request.cookies.get("user")?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    const isAuthPage = pathname === "/login" || pathname === "/register";

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (user && pathname === "/") {
        if (user.role == "user") {
            return NextResponse.redirect(new URL("/my-library", request.url));
        } else if (user.role === "admin") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
