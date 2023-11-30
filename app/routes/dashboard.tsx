import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout/layout";
import { prisma } from "~/libs/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await prisma.user.findMany({});

  return json({ user });
};

export default function Route() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <Layout>
      <h1>Dashboard Page</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
}
