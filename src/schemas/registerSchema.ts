import * as z from 'zod';

// Step 1 schema
export const accountSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  profileImage: z.any().optional(),
  designation: z.string().optional(),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string()
    .min(8, "Password must be at least 8 characters long"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Step 2 schema
export const businessSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  category: z.string().min(1, "Please select a category"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(1, "Please select a city"),
  state: z.string().min(1, "Please select a state"),
  pincode: z.string().min(6, "Pincode must be 6 characters"),
});

// Step 3 schema
export const detailsSchema = z.object({
  description: z.string().min(1, "Business description is required"),
  instagramLink: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  whatsapp: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian WhatsApp number"),
  founded: z.string().optional(),
  logo: z.instanceof(File).optional().or(z.any()),
  coverImage: z.instanceof(File).optional().or(z.any()),
  businessPhotos: z.array(z.instanceof(File)).optional().or(z.any()),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type AccountFormData = z.infer<typeof accountSchema>;
export type BusinessFormData = z.infer<typeof businessSchema>;
export type DetailsFormData = z.infer<typeof detailsSchema>;
export type RegisterFormData = AccountFormData & BusinessFormData & DetailsFormData;
