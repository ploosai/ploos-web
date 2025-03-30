import { json } from '@sveltejs/kit';
import { selectionService } from '$lib/server/selection-service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
  // Check authentication
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const projectId = url.searchParams.get('projectId');
    
    if (!projectId) {
      return json({ error: 'Project ID is required' }, { status: 400 });
    }
    
    // Get filters from URL parameters
    const filters = {
      categoryId: url.searchParams.get('categoryId') || undefined,
      roomId: url.searchParams.get('roomId') || undefined,
      status: url.searchParams.get('status') || undefined,
      assignedTo: url.searchParams.get('assignedTo') || undefined,
    };
    
    const selections = await selectionService.getSelectionItems(projectId, filters);
    return json({ selections });
  } catch (error) {
    console.error('Error fetching selections:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  // Check authentication
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.projectId || !data.categoryId || !data.name) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Add the current user as the creator
    data.createdBy = locals.user.id;
    
    const newSelection = await selectionService.createSelectionItem(data);
    return json({ selection: newSelection[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating selection:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}; 