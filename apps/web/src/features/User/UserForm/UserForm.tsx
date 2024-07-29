import { Button, Title } from "@mantine/core";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import LoadingHandler from "~/components/DataHandling/LoadingHandler/LoadingHandler";

import { Form } from "~/components/Form/Form";
import {
  TUser,
  TUserRoles,
  UserRolesSchema,
  UserSchema,
  insertUserRolesSchema,
  insertUserSchema,
} from "~/server/db/schema";
import { api } from "~/utils/api";

type UserDefaultValues = {
  user: Partial<TUser>;
  role: Partial<TUserRoles>;
};

export type UserSubmitSchema = {
  user: UserSchema;
  role: UserRolesSchema;
};

const UserFormValidation = z.object({
  user: insertUserSchema,
  role: insertUserRolesSchema,
});

type UserFormProps = {
  /* optional default values for the form */
  defaultValues?: UserDefaultValues | undefined;

  /* function to execute when the form is submitted */
  onSubmit: SubmitHandler<UserSubmitSchema>;

  /* check if the form is submitting */
  isLoading?: boolean;

  /* to check if the form is in edit or create mode */
  isEdit?: boolean;
};

const UserForm = ({
  defaultValues,
  onSubmit,
  isLoading,
  isEdit,
}: UserFormProps) => {
  const teams = api.team.findAllWithCountries.useQuery();
  const roles = api.role.findAll.useQuery();

  return (
    <>
      <LoadingHandler status={teams.status}>
        <Form<UserSubmitSchema, typeof UserFormValidation>
          onSubmit={onSubmit}
          schema={UserFormValidation}
          defaultValues={defaultValues}
          key="user-form"
        >
          <Title order={3}>User Details</Title>
          <Form.StringInput<any> mb="sm" name="user.name" label="Name" />
          <Form.StringInput<any>
            mb="sm"
            name="user.username"
            label="Username"
            required
          />
          <Form.StringInput<any> mb="sm" name="user.email" label="Email" />
          <Form.StringInput<any>
            mb="sm"
            name="user.password"
            label="Password"
            required
          />

          <Title order={3}>User Role Details</Title>
          <Form.SelectInput<any>
            mb="sm"
            name="role.roleId"
            label="Role"
            searchable
            data={
              roles.data?.map((c) => ({ value: c.id, label: c.type })) || []
            }
            required
          />
          <Form.SelectInput<any>
            mb="sm"
            name="role.teamId"
            label="Team"
            searchable
            data={
              teams.data?.map((c) => ({ value: c.id, label: c.name })) || []
            }
          />

          <Button type="submit" loading={isLoading} mb="md">
            {isEdit ? "Update" : "Create"}
          </Button>
        </Form>
      </LoadingHandler>
    </>
  );
};
export default UserForm;
