import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const rotasProtegidas = createRouteMatcher([
  '/eventos(.*)',
  '/participantes(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  if (rotasProtegidas(req)) {
    await auth.protect() 
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}