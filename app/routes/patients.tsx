import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout/layout";
import { prisma } from "~/libs/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const patients = await prisma.patient.findMany({
    include: {
      locations: true,
    },
  });

  return json({ patients });
};

export default function Route() {
  const { patients } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <h1>Patients Page</h1>
      <pre>{JSON.stringify(patients, null, 2)}</pre>
    </Layout>
  );
}
