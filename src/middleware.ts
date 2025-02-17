import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";



const isPublicRouter= createRouteMatcher(['/sign-in(.*)','/sign-up(.*)'])   // create a default signin and signup routes.

// export the middlware and set the routes to be protected if they are not public.

export default clerkMiddleware(async(auth,req) => {
    if(!isPublicRouter(req)){
        await auth.protect();                        
    }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};