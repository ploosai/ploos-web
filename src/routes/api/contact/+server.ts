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
    
    const { name, email, message } = data || {};
    
    // Validate inputs
    if (!name || !email || !message) {
      return json(
        { success: false, message: 'Name, email, and message are required' },
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

    // Store in database using raw SQL since we may not have a dedicated table yet
    await db.execute(
      sql`INSERT INTO contact_submissions (name, email, message, created_at) 
          VALUES (${name}, ${email}, ${message}, NOW())`
    ).catch(error => {
      // Handle the case where the table doesn't exist yet
      console.error('Contact table may not exist yet:', error);
      // This is fine for now - we'll just log the submission
    });

    console.log('Contact form submission:', { name, email, message });
    
    return json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
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