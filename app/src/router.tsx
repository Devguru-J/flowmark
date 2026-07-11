import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import { z } from 'zod'
import { LoginPage } from './features/auth/LoginPage'
import { RegisterPage } from './features/auth/RegisterPage'
import { useSession } from './features/auth/session'
import { SettingsPage } from './features/settings/SettingsPage'
import { TasksPage } from './features/tasks/TasksPage'
import { TrashPage } from './features/tasks/TrashPage'
import { AppShell } from './features/tasks/components/AppShell'
import { SORT_OPTIONS, isTaskView } from './features/tasks/domain/views'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/app/$view', params: { view: 'today' } })
  },
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
})

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  beforeLoad: () => {
    if (!useSession.getState().user) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppShell,
})

const taskSearchSchema = z.object({
  q: z.string().optional().catch(undefined),
  sort: z.enum(SORT_OPTIONS).optional().catch(undefined),
  task: z.string().optional().catch(undefined),
})

export type TaskSearch = z.infer<typeof taskSearchSchema>

const viewRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '$view',
  params: {
    parse: (params) => {
      if (!isTaskView(params.view)) {
        throw redirect({ to: '/app/$view', params: { view: 'today' } })
      }
      return { view: params.view }
    },
    stringify: (params) => ({ view: params.view }),
  },
  validateSearch: (search) => taskSearchSchema.parse(search),
  component: TasksPage,
})

const trashRoute = createRoute({
  getParentRoute: () => appRoute,
  path: 'trash',
  component: TrashPage,
})

const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: 'settings',
  component: SettingsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  appRoute.addChildren([viewRoute, trashRoute, settingsRoute]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { viewRoute }
