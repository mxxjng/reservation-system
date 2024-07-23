import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";

import { authStore } from "@/app/auth-store";
import LoginForm from "@/features/Auth/LoginForm";
import Logo from "@/assets/logo.png";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const Login = () => {
  const auth = authStore();
  const { t } = useTranslation();

  if (!auth.loading && auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-200">
      <div className="absolute top-2 left-2 flex items-center">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        <Link to="/">Home</Link>
      </div>
      <div className="max-w-md mx-auto mb-8">
        <div className="p-4 border border-gray-300 rounded-md mb-2 bg-white">
          <div className="flex justify-center">
            <img src={Logo} alt="logo" className="mb-4 text-center" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">{t("login.title")}</h2>
          <p className="mb-4 text-center">{t("login.introText")}</p>
          <LoginForm />
        </div>
        <p className="text-center">
          {t("login.registerQuestion")}{" "}
          <Link className="underline" to="/register">
            {t("login.registerLink")}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
