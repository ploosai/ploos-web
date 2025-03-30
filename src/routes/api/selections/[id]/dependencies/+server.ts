import { json } from '@sveltejs/kit';
import { selectionService } from '$lib/server/selection-service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url, locals }) => {
  // Check authentication
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const selectionId = params.id;
    if (!selectionId) {
      return json({ error: 'Selection ID is required' }, { status: 400 });
    }
    
    // Determine whether to get blocking or blocked items
    const type = url.searchParams.get('type') || 'blocking';
    
    if (type === 'blocking') {
      const blockingItems = await selectionService.getBlockingItems(selectionId);
      return json({ dependencies: blockingItems });
    } else if (type === 'blocked') {
      const blockedItems = await selectionService.getBlockedItems(selectionId);
      return json({ dependencies: blockedItems });
    } else {
      return json({ error: 'Invalid dependency type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching dependencies:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ params, request, locals }) => {
  // Check authentication
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const selectionId = params.id;
    if (!selectionId) {
      return json({ error: 'Selection ID is required' }, { status: 400 });
    }
    
    const data = await request.json();
    if (!data.dependsOnId) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const newDependency = await selectionService.addDependency({
      selectionId,
      dependsOnId: data.dependsOnId,
      reason: data.reason,
    });
    
    return json({ dependency: newDependency[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating dependency:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params, url, locals }) => {
  // Check authentication
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const selectionId = params.id;
    if (!selectionId) {
      return json({ error: 'Selection ID is required' }, { status: 400 });
    }
    
    const dependsOnId = url.searchParams.get('dependsOnId');
    if (!dependsOnId) {
      return json({ error: 'Missing required parameter: dependsOnId' }, { status: 400 });
    }
    
    const removedDependency = await selectionService.removeDependency(selectionId, dependsOnId);
    
    if (!removedDependency.length) {
      return json({ error: 'Dependency not found' }, { status: 404 });
    }
    
    return json({ success: true });
  } catch (error) {
    console.error('Error deleting dependency:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}; 