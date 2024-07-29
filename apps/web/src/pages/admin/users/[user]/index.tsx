import { Box, Button, Group, Title } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import LoadingHandler from "~/components/DataHandling/LoadingHandler/LoadingHandler";
import AdminLayout from "~/components/Layout/AdminLayout";
import DeleteModalContent from "~/components/Modal/DeleteModalContent";
import FormModal from "~/components/Modal/FormModal";
import { useModal } from "~/components/Modal/reducer";
import EditCountryModal from "~/features/Country/Modals/CountryEditModal";
import { api } from "~/utils/api";
import { appRoutes } from "~/utils/constants";
import { showErrorToast, showSuccessToast } from "~/utils/helper";

const { single, overview } = appRoutes.admin.user;

const UserPage = () => {
  const session = useSession();
  const router = useRouter();
  const ctx = api.useUtils();
  const t = useTranslations("admin.user");

  /* Page Modal States */
  const { state, openModal, closeModal } = useModal();

  /* Get the entity id from the router url query */
  const userId = router.query?.user as string;

  /* Query to get the entity */
  const { data, status } = api.user.findOne.useQuery(userId, {
    enabled: !!userId,
    onError: () => {
      showErrorToast(t("notfound"));
      router.push(overview);
    },
  });

  /* Open the edit modal if the url has the edit query set to true */
  React.useEffect(() => {
    if (router.query?.edit && router.query.edit === "true") {
      openModal({
        type: "EDIT",
        data: null,
      });
    }
  }, [userId, router]);

  /* Mutation to delete the entity */
  const { mutate, isLoading: isDeleting } = api.user.delete.useMutation({
    onSuccess: () => {
      ctx.user.findAllWithRoles.invalidate();
      showSuccessToast(t("notifications.delete.success.message"));
      closeModal();

      /* Redirect to the overview page after deletion */
      router.push(overview);
    },
    onError: (error) => {
      error?.message
        ? showErrorToast(error.message)
        : showErrorToast(t("notifications.delete.error.message"));
    },
  });

  return (
    <LoadingHandler status={status}>
      {data && session.data?.user.id && (
        <>
          <FormModal state={state} opened={state.open} onClose={closeModal}>
            {state.type === "DELETE" && state.data && (
              <DeleteModalContent
                title={t("modals.delete.title", { name: state.data.name })}
                text={t("modals.delete.text")}
                cancelButton={
                  <Button variant="default" color="grey" onClick={closeModal}>
                    {t("modals.delete.cancel")}
                  </Button>
                }
                confirmButton={
                  <Button
                    loading={isDeleting}
                    color="red"
                    onClick={() => mutate(state?.data?.id || "")}
                  >
                    {t("modals.delete.confirm")}
                  </Button>
                }
              />
            )}
            {state.type === "EDIT" && (
              <>
                {session?.data?.user?.id && (
                  <EditCountryModal
                    userId={session.data?.user.id}
                    id={userId}
                    defaultData={data}
                    close={closeModal}
                  />
                )}
              </>
            )}
          </FormModal>

          <Breadcrumbs
            customRoutes={[
              { path: single(userId), name: data?.name || "" },
              { path: "/admin", name: "Admin", link: "/admin/dashboard" },
            ]}
          />

          <Group justify="space-between">
            <Box>
              <Title>{data?.name}</Title>
            </Box>
            <Group>
              <Button
                onClick={() => openModal({ type: "EDIT", data: null })}
                variant="default"
                leftSection={<IconEdit size="1rem" />}
              >
                {t("buttons.edit")}
              </Button>
              <Button
                onClick={() =>
                  openModal({
                    type: "DELETE",
                    data: { id: data?.id, name: data?.name || "" },
                  })
                }
                variant="default"
                color="red"
                leftSection={<IconTrash size="1rem" />}
              >
                {t("buttons.delete")}
              </Button>
            </Group>
          </Group>
        </>
      )}
    </LoadingHandler>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getStaticProps = async (context: any) => ({
  props: {
    messages: (await import(`src/lang/${context.locale}.json`)).default,
  },
});

export const getStaticPaths = async () => ({ fallback: "blocking", paths: [] });

export default UserPage;
