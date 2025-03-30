import { db } from './db';
import { 
  selectionItems, selectionDependencies, selectionOptions, selectionComments,
  categories, rooms
} from './schema';
import { eq, and, inArray, asc, desc, sql } from 'drizzle-orm';
import type { SelectionItem, SelectionDependency, SelectionOption } from './types';

export const selectionService = {
  // Category management
  async getCategories(parentId: string | null = null) {
    return db.query.categories.findMany({
      where: parentId ? eq(categories.parentId, parentId) : sql`${categories.parentId} IS NULL`,
      orderBy: asc(categories.order),
    });
  },

  async getCategoryHierarchy() {
    const allCategories = await db.query.categories.findMany({
      orderBy: [asc(categories.order)],
    });
    
    // Build hierarchy
    const categoryMap = new Map();
    const rootCategories = [];
    
    // First pass - create map
    allCategories.forEach(category => {
      categoryMap.set(category.id, {
        ...category,
        children: [],
      });
    });
    
    // Second pass - build tree
    allCategories.forEach(category => {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children.push(categoryMap.get(category.id));
        }
      } else {
        rootCategories.push(categoryMap.get(category.id));
      }
    });
    
    return rootCategories;
  },

  // Selection Items
  async getSelectionItems(projectId: string, filters: {
    categoryId?: string;
    roomId?: string;
    status?: string;
    dueDate?: Date;
    assignedTo?: string;
  } = {}) {
    let query = db.query.selectionItems.findMany({
      where: eq(selectionItems.projectId, projectId),
      orderBy: [asc(selectionItems.dueDate)],
      with: {
        category: true,
        room: true,
        assignedUser: true,
        dependencies: {
          with: {
            dependsOn: true,
          }
        },
        options: true,
      }
    });
    
    if (filters.categoryId) {
      query = db.query.selectionItems.findMany({
        where: and(
          eq(selectionItems.projectId, projectId),
          eq(selectionItems.categoryId, filters.categoryId)
        ),
        orderBy: [asc(selectionItems.dueDate)],
        with: {
          category: true,
          room: true,
          assignedUser: true,
          dependencies: {
            with: {
              dependsOn: true,
            }
          },
          options: true,
        }
      });
    }
    
    if (filters.roomId) {
      query = db.query.selectionItems.findMany({
        where: and(
          eq(selectionItems.projectId, projectId),
          eq(selectionItems.roomId, filters.roomId)
        ),
        orderBy: [asc(selectionItems.dueDate)],
        with: {
          category: true,
          room: true,
          assignedUser: true,
          dependencies: {
            with: {
              dependsOn: true,
            }
          },
          options: true,
        }
      });
    }
    
    if (filters.status) {
      query = db.query.selectionItems.findMany({
        where: and(
          eq(selectionItems.projectId, projectId),
          eq(selectionItems.status, filters.status)
        ),
        orderBy: [asc(selectionItems.dueDate)],
        with: {
          category: true,
          room: true,
          assignedUser: true,
          dependencies: {
            with: {
              dependsOn: true,
            }
          },
          options: true,
        }
      });
    }
    
    if (filters.assignedTo) {
      query = db.query.selectionItems.findMany({
        where: and(
          eq(selectionItems.projectId, projectId),
          eq(selectionItems.assignedTo, filters.assignedTo)
        ),
        orderBy: [asc(selectionItems.dueDate)],
        with: {
          category: true,
          room: true,
          assignedUser: true,
          dependencies: {
            with: {
              dependsOn: true,
            }
          },
          options: true,
        }
      });
    }
    
    return query;
  },
  
  async createSelectionItem(data: {
    projectId: string;
    categoryId: string;
    name: string;
    description?: string;
    roomId?: string;
    status?: string;
    leadTimeInDays?: number;
    budget?: number;
    dueDate?: Date;
    assignedTo?: string;
    createdBy: string;
  }) {
    return db.insert(selectionItems)
      .values({
        ...data,
        status: data.status || 'pending',
      })
      .returning();
  },
  
  async updateSelectionItem(id: string, data: Partial<SelectionItem>) {
    return db.update(selectionItems)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(selectionItems.id, id))
      .returning();
  },
  
  async deleteSelectionItem(id: string) {
    // Delete all dependencies first
    await db.delete(selectionDependencies)
      .where(eq(selectionDependencies.selectionId, id));
    
    await db.delete(selectionDependencies)
      .where(eq(selectionDependencies.dependsOnId, id));
    
    // Delete options
    await db.delete(selectionOptions)
      .where(eq(selectionOptions.selectionItemId, id));
    
    // Delete comments
    await db.delete(selectionComments)
      .where(eq(selectionComments.selectionItemId, id));
    
    // Delete the selection item
    return db.delete(selectionItems)
      .where(eq(selectionItems.id, id))
      .returning();
  },
  
  // Dependencies
  async addDependency(data: {
    selectionId: string;
    dependsOnId: string;
    reason?: string;
  }) {
    return db.insert(selectionDependencies)
      .values(data)
      .returning();
  },
  
  async removeDependency(selectionId: string, dependsOnId: string) {
    return db.delete(selectionDependencies)
      .where(and(
        eq(selectionDependencies.selectionId, selectionId),
        eq(selectionDependencies.dependsOnId, dependsOnId)
      ))
      .returning();
  },
  
  async getDependencyChain(selectionId: string) {
    // Get all dependencies in the chain
    const dependencies = await db.query.selectionDependencies.findMany({
      where: eq(selectionDependencies.selectionId, selectionId),
      with: {
        dependsOn: true,
      }
    });
    
    // Recursively get the dependencies of the dependencies
    const dependencyChain = [];
    for (const dependency of dependencies) {
      dependencyChain.push(dependency);
      const childDependencies = await this.getDependencyChain(dependency.dependsOnId);
      dependencyChain.push(...childDependencies);
    }
    
    return dependencyChain;
  },
  
  // Get all items that need to be completed before this one
  async getBlockingItems(selectionId: string) {
    const dependencyChain = await this.getDependencyChain(selectionId);
    return dependencyChain.map(dep => dep.dependsOn);
  },
  
  // Get all items that are blocked by this one
  async getBlockedItems(selectionId: string) {
    const dependencies = await db.query.selectionDependencies.findMany({
      where: eq(selectionDependencies.dependsOnId, selectionId),
      with: {
        selection: true,
      }
    });
    
    return dependencies.map(dep => dep.selection);
  },
  
  // Selection Options
  async getSelectionOptions(selectionItemId: string) {
    return db.query.selectionOptions.findMany({
      where: eq(selectionOptions.selectionItemId, selectionItemId),
    });
  },
  
  async createSelectionOption(data: {
    selectionItemId: string;
    name: string;
    description?: string;
    manufacturer?: string;
    modelNumber?: string;
    retailer?: string;
    price?: number;
    leadTimeInDays?: number;
    imageUrls?: string[];
    specificationUrl?: string;
  }) {
    return db.insert(selectionOptions)
      .values(data)
      .returning();
  },
  
  async updateSelectionOption(id: string, data: Partial<SelectionOption>) {
    return db.update(selectionOptions)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(selectionOptions.id, id))
      .returning();
  },
  
  async deleteSelectionOption(id: string) {
    return db.delete(selectionOptions)
      .where(eq(selectionOptions.id, id))
      .returning();
  },
  
  async selectOption(selectionItemId: string, optionId: string) {
    // First, unselect all other options
    await db.update(selectionOptions)
      .set({ selected: false })
      .where(eq(selectionOptions.selectionItemId, selectionItemId));
    
    // Then, select the chosen option
    return db.update(selectionOptions)
      .set({ selected: true })
      .where(eq(selectionOptions.id, optionId))
      .returning();
  },
  
  // Comments
  async addComment(data: {
    selectionItemId: string;
    userId: string;
    comment: string;
  }) {
    return db.insert(selectionComments)
      .values(data)
      .returning();
  },
  
  async getComments(selectionItemId: string) {
    return db.query.selectionComments.findMany({
      where: eq(selectionComments.selectionItemId, selectionItemId),
      orderBy: [desc(selectionComments.createdAt)],
      with: {
        user: true,
      }
    });
  },
  
  // Timeline and Critical Path
  async getSelectionTimeline(projectId: string) {
    const allSelections = await this.getSelectionItems(projectId);
    const allDependencies = await db.query.selectionDependencies.findMany({
      where: inArray(
        selectionDependencies.selectionId, 
        allSelections.map(item => item.id)
      ),
    });
    
    // Build dependency map
    const dependencyMap = new Map();
    allSelections.forEach(item => {
      dependencyMap.set(item.id, []);
    });
    
    allDependencies.forEach(dep => {
      const deps = dependencyMap.get(dep.selectionId) || [];
      deps.push(dep.dependsOnId);
      dependencyMap.set(dep.selectionId, deps);
    });
    
    // Calculate earliest start times using a topological sort
    const earliestStart = new Map();
    const visited = new Set();
    
    const visit = (itemId) => {
      if (visited.has(itemId)) return;
      visited.add(itemId);
      
      const dependencies = dependencyMap.get(itemId) || [];
      dependencies.forEach(depId => visit(depId));
      
      const item = allSelections.find(s => s.id === itemId);
      if (!item) return;
      
      let maxDepEnd = new Date(0);
      dependencies.forEach(depId => {
        const depItem = allSelections.find(s => s.id === depId);
        if (!depItem) return;
        
        const depEnd = earliestStart.get(depId);
        if (depEnd && depEnd > maxDepEnd) {
          maxDepEnd = depEnd;
        }
      });
      
      const start = maxDepEnd.getTime() === 0 ? 
        new Date() : 
        new Date(maxDepEnd.getTime());
      
      const leadTimeInDays = item.leadTimeInDays || 0;
      const end = new Date(start);
      end.setDate(end.getDate() + leadTimeInDays);
      
      earliestStart.set(itemId, end);
    };
    
    allSelections.forEach(item => {
      if (!visited.has(item.id)) {
        visit(item.id);
      }
    });
    
    // Return timeline data
    return allSelections.map(item => ({
      ...item,
      earliestStart: earliestStart.get(item.id),
    }));
  },
  
  // Get critical path (items that, if delayed, will delay the entire project)
  async getCriticalPath(projectId: string) {
    const timeline = await this.getSelectionTimeline(projectId);
    
    // Sort by end date descending to get the latest items
    const sortedTimeline = [...timeline].sort(
      (a, b) => b.earliestStart.getTime() - a.earliestStart.getTime()
    );
    
    // The item with the latest end date is the end of the critical path
    const lastItem = sortedTimeline[0];
    if (!lastItem) return [];
    
    // Trace back from the last item
    const criticalPath = [lastItem];
    let currentItem = lastItem;
    
    while (true) {
      // Find all dependencies of the current item
      const dependencies = await db.query.selectionDependencies.findMany({
        where: eq(selectionDependencies.selectionId, currentItem.id),
        with: {
          dependsOn: true,
        }
      });
      
      if (dependencies.length === 0) break;
      
      // Find the dependency with the latest end date
      let latestDep = null;
      let latestEndDate = new Date(0);
      
      for (const dep of dependencies) {
        const depItem = timeline.find(item => item.id === dep.dependsOnId);
        if (!depItem) continue;
        
        if (depItem.earliestStart > latestEndDate) {
          latestEndDate = depItem.earliestStart;
          latestDep = depItem;
        }
      }
      
      if (!latestDep) break;
      
      criticalPath.unshift(latestDep);
      currentItem = latestDep;
    }
    
    return criticalPath;
  },
}; 