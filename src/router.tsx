import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { App } from './App';
import { InputPage } from './pages/InputPage';
import { PreviewPage } from './pages/PreviewPage';
import { PingPage } from './pages/PingPage';

const rootRoute = createRootRoute({
  component: App,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: InputPage,
});

const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview',
  component: PreviewPage,
});

const pingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ping',
  component: PingPage,
});

const routeTree = rootRoute.addChildren([indexRoute, previewRoute, pingRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
} 