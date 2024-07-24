export const MIN_WIDTH = 768;

// import environment variables
export const config = {
  urls: {
    API_URL: "http://localhost:5001",
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
    createReservations: {
      path: "/api/v1/reservations",
      method: "POST",
      queryKey: "createReservations",
    },
  },
};
