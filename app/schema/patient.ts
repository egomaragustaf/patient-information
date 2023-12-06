import { z } from "zod";

// const id = z.string().min(1, "Existing id is required")

// const firstName = z.string().min(1, "First name require at least 1 characters").max(50, "First name can't be longer than 50 characters")

// const lastName =  z.string().min(1, "Last name require at least 1 characters").max(50, "Last name can't be longer than 50 characters")

// const gender = z.string().min(1, "Gender require at least 1 characters").max(15, "Gender can't be longer than 15 characters")

// const dateOfBirth = z.string()

// const contactNumber = z.string()

// const email = z.string().min(1, "Email is required").email("This is not an email")

// const locations = z.object({
//   street: z.string(),
//   city: z.string(),
//   province: z.string(),
//   countryCode: z.string(),
//   postalCode: z.string()
// })

// export const schemaPatient = z.object({
//     id,
//     firstName,
//     lastName,
//     gender,
//     dateOfBirth,
//     contactNumber,
//     email,
//     locations,
//   })

//   export const schemaPatientDelete = z.object({
//       id,
//   })

//   export const schemaPatientUpdate = z.object({
//     patientId: id,
//     id,
//     firstName,
//     lastName,
//     gender,
//     dateOfBirth,
//     contactNumber,
//     email,
//     locations,
//   })


export const schemaPatient = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  contactNumber: z.string(),
  email: z.string(),
  locations: z.object({
    street: z.string(),
    city: z.string(),
    province: z.string(),
    countryCode: z.string(),
    postalCode: z.string()
  })
})