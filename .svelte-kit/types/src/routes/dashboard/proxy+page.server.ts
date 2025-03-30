// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async (event: Parameters<PageServerLoad>[0]) => {
  // Check if the user is authenticated
  if (!event.locals.user) {
    // If not authenticated, redirect to login page
    return redirect(302, '/login');
  }

  // Return the user data to the page
  return {
    user: event.locals.user
    // In a real app, you would also fetch projects and selections data here
  };
}; 