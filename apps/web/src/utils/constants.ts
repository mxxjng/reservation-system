export const DEFAULT_QUERY_LIMIT = 20;

/* all app routes to link to */
export const appRoutes = {
  admin: {
    dashboard: "/admin/dashboard",
    user: {
      overview: "/admin/users",
      single: (id: string) => `/admin/users/${id}`,
      create: "/admin/users/create",
      edit: (id: string) => `/admin/users/${id}/edit`,
    },
    role: {
      overview: "/admin/roles",
      single: (id: string) => `/admin/roles/${id}`,
      create: "/admin/roles/create",
      edit: (id: string) => `/admin/roles/${id}/edit`,
    },
    log: {
      overview: "/admin/logs",
      single: (id: string) => `/admin/logs/${id}`,
      create: "/admin/logs/create",
      edit: (id: string) => `/admin/logs/${id}/edit`,
    },
  },
};
