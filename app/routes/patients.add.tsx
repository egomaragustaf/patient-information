import { parse } from "@conform-to/zod";
import { json, type ActionFunctionArgs, redirect } from "@remix-run/node";
import { Layout } from "~/components/layout/layout";
import { AddNewPatientsForm } from "~/components/shared/add-new-patients.form";
import { prisma } from "~/libs/db.server";
import { schemaPatient } from "~/schema/patient";

export default function Route() {
  return (
    <Layout>
      <h1>Add Patient</h1>
      <AddNewPatientsForm />
    </Layout>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parse(formData, { schema: schemaPatient });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 });
  }

  const newPatient = await prisma.patient.create({
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      gender: submission.value.gender,
      dateOfBirth: submission.value.dateOfBirth,
      contactNumber: submission.value.contactNumber,
      email: submission.value.email,
      locations: {
        create: {
          street: submission.value.locations.street,
          city: submission.value.locations.city,
          province: submission.value.locations.province,
          postalCode: submission.value.locations.postalCode,
          countryCode: submission.value.locations.countryCode,
        },
      },
    },
  });

  if (!newPatient) {
    return json(submission, { status: 500 });
  }

  return redirect(`/patients`);
};
