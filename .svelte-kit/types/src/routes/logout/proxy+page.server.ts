// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import type { Actions } from './$types';

export function load() {
  return redirect(302, '/');
}

export const actions = {
  default: async (event: import('./$types').RequestEvent) => {
    if (event.locals.session) {
      // Invalidate the session in the database
      await auth.invalidateSession(event.locals.session.id);
    }
    
    // Delete the session cookie
    auth.deleteSessionTokenCookie(event);
    
    // Redirect to home page
    return redirect(302, '/');
  }
}; ;null as any as Actions;