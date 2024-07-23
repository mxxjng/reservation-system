import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Form } from "@repo/ui/form";
import { LoginSchema, LoginRequest } from "@repo/validators";

import { login } from "@/features/actions/auth";
import { Button } from "@repo/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

const LoginForm = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    await login(data, setLoading);
  };

  return (
    <Form<LoginRequest, typeof LoginSchema> onSubmit={onSubmit} schema={LoginSchema}>
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
      <div className="flex justify-end mb-4">
        <Link to="/reset-password">
          <p className="text-sm">Passwort vergessen?</p>
        </Link>
      </div>
      <Button variant="secondary" size="lg" type="submit" className="mb-4 w-full">
        {loading ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
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
