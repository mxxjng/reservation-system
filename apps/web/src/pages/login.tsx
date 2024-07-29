import { Box, Tabs, Text, Title } from "@mantine/core";
import { useTranslations } from "next-intl";
import { ReactElement, useState } from "react";

import Layout from "~/components/Layout/Layout";
import LoginForm from "~/features/Auth/LoginForm";
import { NextPageWithLayout } from "./_app";

const LoginPage: NextPageWithLayout = () => {
  const t = useTranslations("Login");
  const [activeTab, setActiveTab] = useState<string | null>("login");

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List grow>
            <Tabs.Tab value="login">Login</Tabs.Tab>
            <Tabs.Tab value="register">Register</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="login" pt="xs">
            <Title my="md">{t("login.title")}</Title>
            <Text mb="md">{t("login.introText")}</Text>
            <LoginForm />
            <Text mt="md">
              {t("login.registerQuestion")}{" "}
              <span onClick={() => setActiveTab("register")}>{t("login.registerLink")}</span>
            </Text>
          </Tabs.Panel>
          <Tabs.Panel value="register" pt="xs">
            <Title my="md">{t("register.title")}</Title>
            <Text mb="md">{t("register.introText")}</Text>
            <Text>coming sooon....</Text>
            <Text mt="md">
              {t("register.loginQuestion")}{" "}
              <span onClick={() => setActiveTab("login")}>{t("register.loginLink")}</span>
            </Text>
          </Tabs.Panel>
        </Tabs>
      </div>
      <div
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: "#ffb01b",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box style={{ textAlign: "center" }} mb="xl">
          <Title mt="lg" c="black">
            Content 1
          </Title>
          <Text c="black">Lorem Ispum dolor sit amet exec vulpur</Text>
        </Box>
      </div>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
