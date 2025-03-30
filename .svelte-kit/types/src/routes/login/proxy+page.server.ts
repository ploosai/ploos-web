// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
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
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return fail(400, { 
        message: 'Email and password are required',
        email
      });
    }

    try {
      // Verify user credentials
      const user = await auth.verifyCredentials(email, password);
      
      if (!user) {
        return fail(400, { 
          message: 'Invalid email or password',
          email
        });
      }

      // Generate a session token and create session
      const sessionToken = auth.generateSessionToken();
      const session = await auth.createSession(sessionToken, user.id);
      
      // Set the session cookie
      auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
      
      // Redirect to dashboard on successful login
      return redirect(302, '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      return fail(500, { 
        message: 'An error occurred during login',
        email
      });
    }
  }
}; ;null as any as Actions;