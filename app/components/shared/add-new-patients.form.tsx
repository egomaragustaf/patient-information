import { conform, useFieldset, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useId } from "react";

import type { action as actionAddNewPatients } from "~/routes/patients.add";
import { schemaPatient } from "~/schema/patient";
import { FormField, FormFieldSet, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Alert } from "~/components/ui/alert";
import { ButtonLoading } from "~/components/ui/button";

export function AddNewPatientsForm() {
  const lastSubmission = useActionData<typeof actionAddNewPatients>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const id = useId();
  const [
    form,
    {
      patientId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      contactNumber,
      email,
      locations,
    },
  ] = useForm({
    id,
    shouldValidate: "onSubmit",
    lastSubmission,
    constraint: getFieldsetConstraint(schemaPatient),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaPatient });
    },
  });
  const { street, city, province, countryCode, postalCode } = useFieldset(
    form.ref,
    locations
  );

  return (
    <section className="space-y-4 rounded bg-stone-900 p-4">
      <header>
        <h3>Quick Broadcast</h3>
        <p className="text-sm text-muted-foreground">
          Quickly create new broadcast to ask or offer
        </p>
      </header>

      <Form method="POST" {...form.props} className="space-y-6">
        <FormFieldSet>
          <input hidden {...conform.input(patientId)} />

          <FormField>
            <FormLabel htmlFor={firstName.id}>First Name</FormLabel>
            <Input
              {...conform.input(firstName)}
              type="text"
              placeholder="John"
            />
            {firstName.error && (
              <Alert variant="destructive" id={firstName.errorId}>
                {firstName.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={lastName.id}>Last Name</FormLabel>
            <Input {...conform.input(lastName)} type="text" placeholder="Doe" />
            {lastName.error && (
              <Alert variant="destructive" id={lastName.errorId}>
                {lastName.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={gender.id}>Gender</FormLabel>
            <Input
              {...conform.input(gender)}
              type="text"
              placeholder="Male/Female"
            />
            {gender.error && (
              <Alert variant="destructive" id={gender.errorId}>
                {gender.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={dateOfBirth.id}>Date of Birth</FormLabel>
            <Input
              {...conform.input(dateOfBirth)}
              type="text"
              placeholder="1996-12-30"
            />
            {dateOfBirth.error && (
              <Alert variant="destructive" id={dateOfBirth.errorId}>
                {dateOfBirth.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={contactNumber.id}>Contact Number</FormLabel>
            <Input
              {...conform.input(contactNumber)}
              type="text"
              placeholder="+628-123-456-7890"
            />
            {contactNumber.error && (
              <Alert variant="destructive" id={contactNumber.errorId}>
                {contactNumber.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={email.id}>Email</FormLabel>
            <Input
              {...conform.input(email)}
              type="text"
              placeholder="johndoe@mail.com"
            />
            {email.error && (
              <Alert variant="destructive" id={email.errorId}>
                {email.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={street.id}>Street</FormLabel>
            <Input
              {...conform.input(street)}
              type="text"
              placeholder="Ex: Jalan Bahagia"
            />
            {street.error && (
              <Alert variant="destructive" id={street.errorId}>
                {street.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={city.id}>city</FormLabel>
            <Input
              {...conform.input(city)}
              type="text"
              placeholder="Ex: Jakarta"
            />
            {city.error && (
              <Alert variant="destructive" id={city.errorId}>
                {city.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={province.id}>province</FormLabel>
            <Input
              {...conform.input(province)}
              type="text"
              placeholder="Ex: DKI Jakarta"
            />
            {province.error && (
              <Alert variant="destructive" id={province.errorId}>
                {province.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={countryCode.id}>Country Code</FormLabel>
            <Input
              {...conform.input(countryCode)}
              type="text"
              placeholder="Ex: 62"
            />
            {countryCode.error && (
              <Alert variant="destructive" id={countryCode.errorId}>
                {countryCode.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={postalCode.id}>Postal Code</FormLabel>
            <Input
              {...conform.input(postalCode)}
              type="text"
              placeholder="Ex: 1234"
            />
            {postalCode.error && (
              <Alert variant="destructive" id={postalCode.errorId}>
                {postalCode.error}
              </Alert>
            )}
          </FormField>

          <ButtonLoading
            type="submit"
            isSubmitting={isSubmitting}
            submittingText="Sending...">
            Send
          </ButtonLoading>
        </FormFieldSet>
      </Form>
    </section>
  );
}
