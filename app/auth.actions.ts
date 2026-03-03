'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { addUser, getUserByEmail } from '@/lib/data';
import bcrypt from 'bcryptjs';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signup(
  prevState: string | undefined,
  formData: FormData,
) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return 'Please fill out all fields.';
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return 'User with this email already exists.';
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await addUser({ name, email, passwordHash });

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Something went wrong during sign in.';
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
}
