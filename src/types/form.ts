import { z } from 'zod';

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
] as const;

export const MARITAL_STATUS_OPTIONS = [
  'Single',
  'Married',
  'Divorced',
  'Widowed'
] as const;

export const RELIGION_OPTIONS = [
  'Christianity',
  'Islam',
  'Others',
  'Prefer not to say'
] as const;

export const POPULAR_BEATS = [
  'Central Bank of Nigeria (CBN)',
  'Capital Market / NGX',
  'Energy / Oil & Gas',
  'Banking & Financial Institutions',
  'Maritime & Shipping',
  'FinTech & Digital Economy',
  'Insurance & Pensions',
  'Tax & Fiscal Policy (FIRS)',
  'Aviation & Transport',
  'Agriculture & Commodities',
  'Industry, Trade & Investment',
  'Budget, Planning & Debt Management'
];

import { ALL_VERIFIED_BANKS } from '../data/nigerianBanks';

export const NIGERIAN_BANKS = ALL_VERIFIED_BANKS.map((b) => b.name);


export const formSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name is too long')
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: 'Please provide at least first and last name',
    }),
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  dob: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      return !isNaN(date.getTime()) && date < now;
    }, 'Date of birth must be a past date'),
  maritalStatus: z.string().optional(),
  stateOrigin: z.string().min(1, 'State of origin is required'),
  phone: z
    .string()
    .min(8, 'Phone number must be at least 8 digits')
    .regex(/^[0-9+()\- ]+$/, 'Please enter a valid phone number'),
  altPhone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9+()\- ]+$/.test(val), {
      message: 'Please enter a valid phone number',
    }),
  religion: z.string().optional(),

  // Professional Information
  organisation: z
    .string()
    .min(2, 'Organisation / Media House is required'),
  orgAddress: z
    .string()
    .min(5, 'Organisation address must be at least 5 characters'),
  beats: z
    .array(z.string().min(1, 'Beat item cannot be empty'))
    .min(1, 'Please select or add at least 1 beat/field covered')
    .max(3, 'You can select a maximum of 3 beats only'),

  // Bank Details
  bankName: z.string().trim().min(2, 'Please select or enter your bank name'),
  accountName: z
    .string()
    .min(3, 'Account name must match your bank records'),
  accountNumber: z
    .string()
    .length(10, 'NUBAN account number must be exactly 10 digits')
    .regex(/^\d{10}$/, 'Account number must contain digits only'),

  // Next of Kin 1
  nok1Name: z
    .string()
    .min(3, 'Next of Kin 1 full name is required'),
  nok1Phone: z
    .string()
    .min(8, 'Next of Kin 1 phone number is required')
    .regex(/^[0-9+()\- ]+$/, 'Please enter a valid phone number'),
  nok1Address: z
    .string()
    .min(5, 'Next of Kin 1 address is required'),

  // Next of Kin 2
  nok2Name: z
    .string()
    .min(3, 'Next of Kin 2 full name is required'),
  nok2Phone: z
    .string()
    .min(8, 'Next of Kin 2 phone number is required')
    .regex(/^[0-9+()\- ]+$/, 'Please enter a valid phone number'),
  nok2Address: z
    .string()
    .min(5, 'Next of Kin 2 address is required'),
});

export type FormSchemaType = z.infer<typeof formSchema>;
