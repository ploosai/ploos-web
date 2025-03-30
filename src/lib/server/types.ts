// Selection system types
export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  description: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  children?: Category[]; // Used for hierarchy
}

export interface SelectionItem {
  id: string;
  projectId: string;
  categoryId: string;
  name: string;
  description: string | null;
  roomId: string | null;
  status: string;
  leadTimeInDays: number | null;
  budget: number | null;
  actualCost: number | null;
  dueDate: Date | null;
  completedDate: Date | null;
  assignedTo: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  category?: Category;
  room?: Room;
  assignedUser?: User;
  dependencies?: SelectionDependency[];
  options?: SelectionOption[];
  
  // Timeline data
  earliestStart?: Date;
}

export interface SelectionDependency {
  id: string;
  selectionId: string;
  dependsOnId: string;
  reason: string | null;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  selection?: SelectionItem;
  dependsOn?: SelectionItem;
}

export interface SelectionOption {
  id: string;
  selectionItemId: string;
  name: string;
  description: string | null;
  manufacturer: string | null;
  modelNumber: string | null;
  retailer: string | null;
  price: number | null;
  leadTimeInDays: number | null;
  imageUrls: string[] | null;
  specificationUrl: string | null;
  selected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectionComment {
  id: string;
  selectionItemId: string;
  userId: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  user?: User;
}

export interface Project {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  status: string;
  totalBudget: number | null;
  startDate: Date | null;
  targetCompletionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  buildings?: Building[];
  selectionItems?: SelectionItem[];
}

export interface Building {
  id: string;
  projectId: string;
  name: string;
  type: string | null;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  floors?: Floor[];
}

export interface Floor {
  id: string;
  buildingId: string;
  name: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  rooms?: Room[];
}

export interface Room {
  id: string;
  floorId: string;
  name: string;
  type: string;
  area: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Selection status options
export const SELECTION_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  APPROVED: 'approved',
  ORDERED: 'ordered',
  DELIVERED: 'delivered',
  INSTALLED: 'installed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type SelectionStatus = typeof SELECTION_STATUS[keyof typeof SELECTION_STATUS]; 