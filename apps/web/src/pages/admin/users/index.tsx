import { ActionIcon, Alert, Avatar, Box, Button, Group, Paper, Text, Title } from "@mantine/core";
import { IconBuildingStadium, IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ReactElement } from "react";

import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import EmptyListHandler from "~/components/DataHandling/EmptyListHandler/EmptyListHandler";
import LoadingHandler from "~/components/DataHandling/LoadingHandler/LoadingHandler";
import AdminLayout from "~/components/Layout/AdminLayout";
import DeleteModalContent from "~/components/Modal/DeleteModalContent";
import FormModal from "~/components/Modal/FormModal";
import { useModal } from "~/components/Modal/reducer";
import DynamicTable from "~/components/Table/DynamicTable";
import TableMenu from "~/components/Table/TableMenu";
import CreateCountryModal from "~/features/Country/Modals/CountryCreateModal";
import { NextPageWithLayout } from "~/pages/_app";
import { RouterOutputs, api } from "~/utils/api";
import { appRoutes } from "~/utils/constants";
import { showErrorToast, showSuccessToast } from "~/utils/helper";

const { single } = appRoutes.admin.user;

const UsersPage: NextPageWithLayout = () => {
  const t = useTranslations("admin.user");
  const session = useSession();
  const ctx = api.useUtils();

  /* Page Modal States */
  const { state, openModal, closeModal } = useModal();

  const { data, status } = api.user.findAllWithRoles.useQuery();

  const { mutate, isLoading: isDeleting } = api.user.delete.useMutation({
    onSuccess: () => {
      ctx.user.findAllWithRoles.invalidate();
      showSuccessToast(t("notifications.delete.success.message"));
      closeModal();
    },
    onError: (error) => {
      error?.message
        ? showErrorToast(error.message)
        : showErrorToast(t("notifications.delete.error.message"));
    },
  });

  // helper to define the table
  const columnHelper =
    createColumnHelper<NonNullable<RouterOutputs["user"]["findAllWithRoles"]>[number]>();

  // defines the table structure
  const columns = [
    columnHelper.accessor("user.email", {
      header: "Email",
      cell: (info) => (
        <Link href={single(info.row.original.id)}>
          <Group>
            <Avatar>{info.getValue()[0]}</Avatar>
            <span>{info.getValue()}</span>
          </Group>
        </Link>
      ),
    }),
    {
      header: "Action",
      cell: (info: any) => (
        <TableMenu
          detailLink={single(info.row.original.id)}
          editLink={single(info.row.original.id) + "?edit=true"}
          onDelete={() =>
            openModal({
              type: "DELETE",
              data: { id: info.row.original.id, name: info.row.original.name },
            })
          }
        />
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs customRoutes={[{ path: "/admin", name: "Admin", link: "/admin/dashboard" }]} />

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
        {state.type === "CREATE" && (
          <>
            {session?.data?.user?.id && (
              <CreateCountryModal userId={session.data.user.id} close={closeModal} />
            )}
          </>
        )}
      </FormModal>

      <Box mb="xl">
        <Title>{t("overview.headline")}</Title>
        <Text mb="md">{t("overview.description")}</Text>
      </Box>

      <LoadingHandler
        status={status}
        errorComponent={
          <Alert
            variant="light"
            color="red"
            title="Error"
            icon={<IconInfoCircle size="1rem" stroke={1.5} />}
          >
            {t("notifications.loadErrorMultiple")}
          </Alert>
        }
      >
        <EmptyListHandler
          length={data?.length ?? 0}
          emptyMessage={
            <Group justify="center" mt="xl">
              <Paper withBorder p="xl" radius="md">
                <ActionIcon variant="light" size={"xl"} mb="sm">
                  <IconBuildingStadium size="2rem" stroke={1.5} />
                </ActionIcon>
                <Title order={3}>{t("overview.emptyTitle")}</Title>
                <Text mb="md">{t("overview.emptyMessage")}</Text>
                <Button
                  onClick={() => openModal({ type: "CREATE", data: null })}
                  autoContrast
                  leftSection={<IconPlus strokeWidth={1.5} />}
                >
                  {t("buttons.create")}
                </Button>
              </Paper>
            </Group>
          }
        >
          <DynamicTable
            data={data || []}
            columns={columns}
            actionButton={
              <Group>
                <Button
                  autoContrast
                  onClick={() => openModal({ type: "CREATE", data: null })}
                  leftSection={<IconPlus strokeWidth={1.5} size="1rem" />}
                >
                  {t("buttons.create")}
                </Button>
              </Group>
            }
          />
        </EmptyListHandler>
      </LoadingHandler>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getStaticProps = async (context: any) => ({
  props: {
    messages: (await import(`src/lang/${context.locale}.json`)).default,
  },
});

export default UsersPage;
