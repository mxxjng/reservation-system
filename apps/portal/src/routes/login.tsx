import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";

import { authStore } from "@/app/auth-store";
import LoginForm from "@/features/Auth/LoginForm";
import Logo from "@/assets/logo.png";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";

const Login = () => {
  const auth = authStore();
  const { t } = useTranslation();

  if (!auth.loading && auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative flex justify-center items-center h-screen bg-background">
      <div className="absolute top-2 left-2 flex items-center text-muted-foreground">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        <Link to="/">Home</Link>
      </div>
      <div className="absolute top-2 right-2">
        <ThemeToggle />
      </div>
      <div className="max-w-md mx-auto mb-8">
        <Card className="w-full min-w-[500px] mb-2">
          <CardHeader>
            <img src={Logo} alt="logo" className="max-w-[200px] mx-auto mb-4 text-center" />
            <CardTitle className="text-center">Create project</CardTitle>
            <CardDescription className="text-center">
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
        <p className="text-center text-muted-foreground text-sm">
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
