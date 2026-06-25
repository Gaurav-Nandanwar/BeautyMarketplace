import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z
  .object({
    displayName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["customer", "salon_owner"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const bookingSchema = z.object({
  serviceIds: z.array(z.string()).min(1, "Select at least one service"),
  date: z.string().min(1, "Select a date"),
  slot: z.string().min(1, "Select a time slot"),
  staffId: z.string().optional(),
  paymentMethod: z.enum(["cash", "upi", "card"]),
  notes: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});

export const salonSchema = z.object({
  name: z.string().min(2, "Salon name is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  locality: z.string().min(1, "Locality is required"),
  address: z.string().min(5, "Address is required"),
  phone: z.string().min(10, "Valid phone number required"),
  priceRange: z.enum(["budget", "mid", "luxury"]),
  gender: z.enum(["unisex", "women", "men"]),
  homeService: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type SalonInput = z.infer<typeof salonSchema>;
