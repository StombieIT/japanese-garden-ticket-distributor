/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthSignInImport } from './routes/_auth/sign-in'
import { Route as AuthRegisterImport } from './routes/_auth/register'

// Create Virtual Routes

const AuthLazyImport = createFileRoute('/_auth')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AuthLazyRoute = AuthLazyImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_auth.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthSignInRoute = AuthSignInImport.update({
  path: '/sign-in',
  getParentRoute: () => AuthLazyRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  path: '/register',
  getParentRoute: () => AuthLazyRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/register': {
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthLazyImport
    }
    '/_auth/sign-in': {
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof AuthLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AuthLazyRoute.addChildren([AuthRegisterRoute, AuthSignInRoute]),
])

/* prettier-ignore-end */