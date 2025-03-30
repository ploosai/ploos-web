import { json } from '@sveltejs/kit';
import { selectionService } from '$lib/server/selection-service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
  // Check authentication
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get either a flat list or hierarchical structure based on query param
    const hierarchical = url.searchParams.get('hierarchical') === 'true';
    const parentId = url.searchParams.get('parentId') || null;
    
    if (hierarchical) {
      const categoryHierarchy = await selectionService.getCategoryHierarchy();
      return json({ categories: categoryHierarchy });
    } else {
      const categories = await selectionService.getCategories(parentId);
      return json({ categories });
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
}; 