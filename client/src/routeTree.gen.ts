/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FindCvImport } from './routes/find-cv'
import { Route as CvStoreImport } from './routes/cv-store'
import { Route as AddCvImport } from './routes/add-cv'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const FindCvRoute = FindCvImport.update({
  id: '/find-cv',
  path: '/find-cv',
  getParentRoute: () => rootRoute,
} as any)

const CvStoreRoute = CvStoreImport.update({
  id: '/cv-store',
  path: '/cv-store',
  getParentRoute: () => rootRoute,
} as any)

const AddCvRoute = AddCvImport.update({
  id: '/add-cv',
  path: '/add-cv',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/add-cv': {
      id: '/add-cv'
      path: '/add-cv'
      fullPath: '/add-cv'
      preLoaderRoute: typeof AddCvImport
      parentRoute: typeof rootRoute
    }
    '/cv-store': {
      id: '/cv-store'
      path: '/cv-store'
      fullPath: '/cv-store'
      preLoaderRoute: typeof CvStoreImport
      parentRoute: typeof rootRoute
    }
    '/find-cv': {
      id: '/find-cv'
      path: '/find-cv'
      fullPath: '/find-cv'
      preLoaderRoute: typeof FindCvImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/add-cv': typeof AddCvRoute
  '/cv-store': typeof CvStoreRoute
  '/find-cv': typeof FindCvRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/add-cv': typeof AddCvRoute
  '/cv-store': typeof CvStoreRoute
  '/find-cv': typeof FindCvRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/add-cv': typeof AddCvRoute
  '/cv-store': typeof CvStoreRoute
  '/find-cv': typeof FindCvRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/add-cv' | '/cv-store' | '/find-cv'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/add-cv' | '/cv-store' | '/find-cv'
  id: '__root__' | '/' | '/add-cv' | '/cv-store' | '/find-cv'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AddCvRoute: typeof AddCvRoute
  CvStoreRoute: typeof CvStoreRoute
  FindCvRoute: typeof FindCvRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AddCvRoute: AddCvRoute,
  CvStoreRoute: CvStoreRoute,
  FindCvRoute: FindCvRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/add-cv",
        "/cv-store",
        "/find-cv"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/add-cv": {
      "filePath": "add-cv.tsx"
    },
    "/cv-store": {
      "filePath": "cv-store.tsx"
    },
    "/find-cv": {
      "filePath": "find-cv.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
