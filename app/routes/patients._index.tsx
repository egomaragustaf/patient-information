import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout/layout";
import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
} from "~/components/shared/pagination";
import { SearchFormPatients } from "~/components/shared/search-form-patients";
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
  const config = getPaginationConfigs({ request, defaultLimit: 10 });

  const where = !config.queryParam
    ? {}
    : {
        OR: [
          { firstName: { contains: config.queryParam } },
          { lastName: { contains: config.queryParam } },
        ],
      };

  const [totalItems, items] = await prisma.$transaction([
    prisma.patient.count({ where }),
    prisma.patient.findMany({
      where,
      skip: config.skip,
      take: config.limitParam,
      include: {
        locations: true,
      },
    }),
  ]);

  return json({
    ...getPaginationOptions({ request, totalItems }),
    items,
  });
};

export default function Route() {
  const { items: patients, ...loaderData } = useLoaderData<typeof loader>();

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
        <TableFooter>
          <TableRow>
            <TableCell className="text-right" colSpan={5}>
              <PaginationNavigation {...loaderData} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Layout>
  );
}
