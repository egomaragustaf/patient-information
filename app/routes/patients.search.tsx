import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout/layout";
import { SearchFormPatients } from "~/components/shared/search-form-patients";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { prisma } from "~/libs/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    const patients = await prisma.patient.findMany({
      take: 10,
      include: {
        locations: true,
      },
    });

    return json({ query, count: patients.length, patients });
  }

  const [patients] = await prisma.$transaction([
    prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
          { locations: { some: { city: { contains: query } } } },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        gender: true,
        email: true,
        contactNumber: true,
        dateOfBirth: true,
        locations: {
          select: {
            street: true,
            city: true,
            province: true,
            postalCode: true,
            countryCode: true,
          },
        },
      },
      orderBy: [{ firstName: "asc" }],
    }),
  ]);

  return json({ query, count: patients.length, patients });
};

export default function Route() {
  const { patients } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <h1>Patients Page</h1>
      {/* <pre>{JSON.stringify(patients, null, 2)}</pre> */}
      <SearchFormPatients />
      <Table>
        <TableCaption>A list of data patients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-60">Full Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact Number</TableHead>
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
                <TableCell>
                  {patient.locations[0].street} {patient.locations[0].city}
                </TableCell>
                <TableCell>{patient.contactNumber}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Layout>
  );
}
