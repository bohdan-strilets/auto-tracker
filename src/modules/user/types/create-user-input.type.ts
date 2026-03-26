import { Locale, RegistrationSource } from '@prisma/client';

export type CreateUserInput = {
  email: string;
  firstName: string;
  lastName: string;
  locale: Locale;
  timezone: string;
  registrationSource: RegistrationSource;
};
