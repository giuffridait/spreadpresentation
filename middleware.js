import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.headers.get("authorization");

  const username = "demo";
  const password = "spr34dd3m0";

  if (auth) {
    const encoded = auth.split(" ")[1] || "";
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(":");

    if (user === username && pass === password) {
      return NextResponse.next();
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Spreadshirt AI Strategy"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
