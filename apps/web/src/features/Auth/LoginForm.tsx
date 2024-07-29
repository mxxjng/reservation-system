import { Alert, Button } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "~/components/Form/Form";
import { LoginSchema, loginSchema } from "~/types/auth";

const LoginForm = () => {
  const router = useRouter();
  const { error } = router.query;
  const [loading, setLoading] = React.useState(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setLoading(true);
    await signIn("admin-credentials", {
      ...data,
      callbackUrl: "/",
    });
  };

  return (
    <Form<LoginSchema, typeof loginSchema>
      onSubmit={onSubmit}
      schema={loginSchema}
      key="login-form"
    >
      <Form.StringInput<LoginSchema> mb="sm" name="email" label="Email" />
      <Form.StringInput<LoginSchema> name="password" label="Password" type="password" mb="sm" />
      <Button type="submit" loading={loading} mb="md">
        Login
      </Button>
      {error && (
        <Alert
          variant="light"
          color="red"
          title="Login Failed. Please try again."
          icon={<IconInfoCircle />}
        />
      )}
    </Form>
  );
};
export default LoginForm;
