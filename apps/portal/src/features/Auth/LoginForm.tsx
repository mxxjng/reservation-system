import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { LoginRequest, LoginSchema } from "@repo/validators";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { login } from "@/features/actions/auth";

const LoginForm = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    await login(data, setLoading);
  };

  return (
    <Form<LoginRequest, typeof LoginSchema> onSubmit={onSubmit} schema={LoginSchema}>
      <div className="grid grid-cols-1 gap-4">
        <Form.StringInput<LoginRequest>
          id="email"
          name="email"
          label={t("login.form.email.label")}
          placeholder={t("login.form.email.placeholder")}
          required
          className="mb-2"
        />
        <Form.StringInput<LoginRequest>
          id="password"
          type="password"
          name="password"
          label={t("login.form.password.label")}
          placeholder={t("login.form.password.placeholder")}
          className="mb-2"
          required
        />
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/reset-password">
          <p className="text-sm text-muted-foreground">Passwort vergessen?</p>
        </Link>
      </div>
      <Button size="lg" type="submit" className="mb-4 w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </>
        ) : (
          t("login.form.submit")
        )}
      </Button>
    </Form>
  );
};
export default LoginForm;
