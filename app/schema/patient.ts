import { z } from "zod";

const id = z.string().min(1, "Existing id is required")

export const schemaPatient = z.object({
    patientId: id,
    firstName: z.string().min(1, "First name require at least 1 characters").max(50, "First name can't be longer than 50 characters"),
    lastName: z.string().min(1, "Last name require at least 1 characters").max(50, "Last name can't be longer than 50 characters"),
    gender: z.string().min(1, "Gender require at least 1 characters").max(15, "Gender can't be longer than 15 characters"),
    dateOfBirth: z.date(),
    contactNumber: z.string(),
    email: z.string().min(1, "Email is required").email("This is not an email"),
    locations: z.object({
      street: z.string(),
      city: z.string(),
      province: z.string(),
      countryCode: z.string(),
      postalCode: z.string()
    })
  })

  export const schemaPatientDelete = z.object({
      id,
  })

  export const schemaPatientUpdate = z.object({
    patientId: id,
    id,
    firstName: z.string().min(1, "First name require at least 1 characters").max(50, "First name can't be longer than 50 characters"),
    lastName: z.string().min(1, "Last name require at least 1 characters").max(50, "Last name can't be longer than 50 characters"),
    gender: z.string().min(1, "Gender require at least 1 characters").max(15, "Gender can't be longer than 15 characters"),
    dateOfBirth: z.date(),
    contactNumber: z.string(),
    email: z.string().min(1, "Email is required").email("This is not an email"),
    locations: z.object({
      street: z.string(),
      city: z.string(),
      province: z.string(),
      countryCode: z.string(),
      postalCode: z.string()
    })
  })