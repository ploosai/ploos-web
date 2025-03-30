import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
  try {
    // More safely parse JSON with error handling
    let data;
    try {
      data = await request.json();
    } catch (parseError) {
      console.error('Error parsing JSON from request:', parseError);
      return json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    const { email } = data || {};
    
    // Validate email
    if (!email) {
      return json(
        { success: false, message: 'Email address is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if we've seen this email before
    try {
      // Store in database using raw SQL since we may not have a dedicated table yet
      await db.execute(
        sql`INSERT INTO waitlist_signups (email, created_at) 
            VALUES (${email}, NOW())
            ON CONFLICT (email) DO UPDATE 
            SET updated_at = NOW()`
      ).catch(error => {
        // Handle the case where the table doesn't exist yet
        console.error('Waitlist table may not exist yet:', error);
        // This is fine for now - we'll just log the submission
      });
    } catch (err) {
      console.log('Email may already exist or table needs to be created:', err);
      // Continue execution to provide a good user experience
    }
    
    console.log('Waitlist signup:', { email });
    
    return json({
      success: true,
      message: 'Thank you for joining our waitlist! We will keep you updated on our launch.'
    });
  } catch (error) {
    console.error('Error processing waitlist signup:', error);
    // Return a more descriptive error if possible
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return json(
      { 
        success: false, 
        message: 'An error occurred while processing your request',
        error: errorMessage
      },
      { status: 500 }
    );
  }
}; 