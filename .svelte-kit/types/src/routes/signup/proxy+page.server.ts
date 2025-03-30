// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { auth, ROLES } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
  // If user is already logged in, redirect to dashboard
  if (event.locals.user) {
    return redirect(302, '/dashboard');
  }
  return {};
};

export const actions = {
  default: async (event: import('./$types').RequestEvent) => {
    const formData = await event.request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordConfirm = formData.get('passwordConfirm') as string;
    const role = formData.get('role') as string;
    const agreeTerms = formData.get('agree-terms') === 'on';

    // Validation checks
    if (!name || !email || !password || !passwordConfirm || !role) {
      return fail(400, { 
        message: 'All fields are required',
        name,
        email,
      });
    }

    if (password !== passwordConfirm) {
      return fail(400, { 
        message: 'Passwords do not match',
        name,
        email,
      });
    }

    if (!agreeTerms) {
      return fail(400, { 
        message: 'You must agree to the terms and conditions',
        name,
        email,
      });
    }

    // Validate that role is one of the approved roles
    if (!Object.values(ROLES).includes(role as any)) {
      return fail(400, { 
        message: 'Invalid role selected',
        name,
        email,
      });
    }

    try {
      // Check if user already exists
      // Implementation would depend on your database setup

      // Create the user
      const user = await auth.createUser({
        name,
        email,
        password,
        role: role as any,
      });
      
      // Generate a session token and create session
      const sessionToken = auth.generateSessionToken();
      const session = await auth.createSession(sessionToken, user.id);
      
      // Set the session cookie
      auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
      
      // Redirect to dashboard on successful signup
      return redirect(302, '/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      
      // Check for duplicate email error
      if (error instanceof Error && error.message.includes('duplicate key')) {
        return fail(400, { 
          message: 'Email already in use. Please use a different email or sign in.',
          name,
          email
        });
      }
      
      return fail(500, { 
        message: 'An error occurred during signup. Please try again.',
        name,
        email
      });
    }
  }
}; ;null as any as Actions;