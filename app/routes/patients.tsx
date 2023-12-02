import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout/layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { prisma } from "~/libs/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const patients = await prisma.patient.findMany({
    include: {
      locations: true,
    },
    take: 5,
  });

  return json({ patients });
};

export default function Route() {
  const { patients } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <h1>Patients Page</h1>
      {/* <pre>{JSON.stringify(patients, null, 2)}</pre> */}
      <Table>
        <TableCaption>A list of data patients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-60">Full Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead className="text-right">Contact Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            return (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">
                  {patient.firstName} {patient.lastName}
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
                <TableCell className="text-right">
                  {patient.contactNumber}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-right" colSpan={4}>
              Pagination here
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Layout>
  );
}
