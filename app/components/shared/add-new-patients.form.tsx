import { conform, useFieldset, useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { Form, useActionData, useNavigation } from "@remix-run/react";

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

  const [
    form,
    {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      contactNumber,
      email,
      locations,
    },
  ] = useForm({
    shouldValidate: "onSubmit",
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: schemaPatient });
    },
  });
  const { street, city, province, countryCode, postalCode } = useFieldset(
    form.ref,
    locations
  );

  return (
    <section className="space-y-4 rounded p-4 bg-slate-100">
      <header>
        <p className="text-sm text-muted-foreground">
          This is form to add patient
        </p>
      </header>

      <Form method="POST" {...form.props} className="space-y-6">
        <FormFieldSet>
          <FormField>
            <FormLabel htmlFor={firstName.id}>First Name</FormLabel>
            <Input
              {...conform.input(firstName)}
              id={firstName.id}
              name="firstName"
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
            <Input
              {...conform.input(lastName)}
              id={lastName.id}
              name="lastName"
              placeholder="Doe"
            />
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
              id={gender.id}
              name="gender"
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
              id={dateOfBirth.id}
              name="dateOfBirth"
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
              id={contactNumber.id}
              name="contactNumber"
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
              id={email.id}
              name="email"
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
              id={street.id}
              name="street"
              placeholder="Ex: Jalan Bahagia"
            />
            {street.error && (
              <Alert variant="destructive" id={street.errorId}>
                {street.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={city.id}>City</FormLabel>
            <Input
              {...conform.input(city)}
              id={city.id}
              name="city"
              placeholder="Ex: Jakarta"
            />
            {city.error && (
              <Alert variant="destructive" id={city.errorId}>
                {city.error}
              </Alert>
            )}
          </FormField>

          <FormField>
            <FormLabel htmlFor={province.id}>Province</FormLabel>
            <Input
              {...conform.input(province)}
              id={province.id}
              name="province"
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
              id={countryCode.id}
              name="countryCode"
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
              id={postalCode.id}
              name="postalCode"
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
            submittingText="Submitting..."
            className="w-full">
            Submit
          </ButtonLoading>
        </FormFieldSet>
      </Form>
    </section>
  );
}
