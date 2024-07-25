export const MIN_WIDTH = 768;

export const config = {
  urls: {
    API_URL: import.meta.env.VITE_API_URL,
  },
};

/* API Endpoints */
export const apiEndpoints = {
  auth: {
    register: {
      path: "/api/v1/auth/register",
      method: "POST",
      queryKey: "register",
    },
    login: {
      path: "/api/v1/auth/login",
      method: "POST",
      queryKey: "login",
    },
    getAuthUser: {
      path: "/api/v1/auth/user",
      method: "GET",
      queryKey: "getAuthUser",
    },
  },
  reservation: {
    getReservations: {
      path: "/api/v1/reservations",
      method: "GET",
      queryKey: "getReservations",
    },
    getReservation: {
      path: (id: string) => `/api/v1/reservations/${id}`,
      method: "GET",
      queryKey: "getReservation",
    },
    createReservations: {
      path: "/api/v1/reservations",
      method: "POST",
      queryKey: "createReservations",
    },
    deleteReservations: {
      path: (id: string) => `/api/v1/reservations/${id}`,
      method: "DELETE",
      queryKey: "deleteReservations",
    },
  },
};

/* Permission Cases for the application */
export const permissionCases = [
  "reservation:read",
  "reservation:write",
  "hasRequiredPermissions",
] as const;
