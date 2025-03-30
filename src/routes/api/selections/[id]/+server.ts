import { json } from '@sveltejs/kit';
import { selectionService } from '$lib/server/selection-service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
  // Check authentication
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const selectionId = params.id;
    if (!selectionId) {
      return json({ error: 'Selection ID is required' }, { status: 400 });
    }
    
    // For now, we'll just return the selection from the list
    // In a real implementation, we'd have a dedicated getSelectionById method
    const selections = await selectionService.getSelectionItems(selectionId);
    const selection = selections.find(s => s.id === selectionId);
    
    if (!selection) {
      return json({ error: 'Selection not found' }, { status: 404 });
    }
    
    return json({ selection });
  } catch (error) {
    console.error('Error fetching selection:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

export const PUT: RequestHandler = async ({ params, request, locals }) => {
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
    const updatedSelection = await selectionService.updateSelectionItem(selectionId, data);
    
    if (!updatedSelection.length) {
      return json({ error: 'Selection not found' }, { status: 404 });
    }
    
    return json({ selection: updatedSelection[0] });
  } catch (error) {
    console.error('Error updating selection:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
  // Check authentication
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const selectionId = params.id;
    if (!selectionId) {
      return json({ error: 'Selection ID is required' }, { status: 400 });
    }
    
    const deletedSelection = await selectionService.deleteSelectionItem(selectionId);
    
    if (!deletedSelection.length) {
      return json({ error: 'Selection not found' }, { status: 404 });
    }
    
    return json({ success: true });
  } catch (error) {
    console.error('Error deleting selection:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}; 