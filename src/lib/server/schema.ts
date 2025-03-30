import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  uuid,
  boolean,
  integer,
  json,
  foreignKey
} from 'drizzle-orm/pg-core';

// Users and Authentication
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  passwordHash: varchar('password_hash', { length: 255 }),
  role: varchar('role', { length: 50 }).notNull().default('homeowner'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userRoles = pgTable('user_roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 50 }).notNull(),
  // For more granular permissions within a project
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }),
});

// Projects
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 20 }),
  status: varchar('status', { length: 50 }).default('planning').notNull(),
  totalBudget: integer('total_budget'),
  startDate: timestamp('start_date'),
  targetCompletionDate: timestamp('target_completion_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Project Structure
export const buildings = pgTable('buildings', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const floors = pgTable('floors', {
  id: uuid('id').defaultRandom().primaryKey(),
  buildingId: uuid('building_id').notNull().references(() => buildings.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  level: integer('level').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rooms = pgTable('rooms', {
  id: uuid('id').defaultRandom().primaryKey(),
  floorId: uuid('floor_id').notNull().references(() => floors.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  area: integer('area'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Selection Categories
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  parentId: uuid('parent_id').references(() => categories.id),
  description: text('description'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Selection Items
export const selectionItems = pgTable('selection_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  roomId: uuid('room_id').references(() => rooms.id),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  leadTimeInDays: integer('lead_time_in_days'),
  budget: integer('budget'),
  actualCost: integer('actual_cost'),
  dueDate: timestamp('due_date'),
  completedDate: timestamp('completed_date'),
  assignedTo: uuid('assigned_to').references(() => users.id),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Dependencies between selections
export const selectionDependencies = pgTable('selection_dependencies', {
  id: uuid('id').defaultRandom().primaryKey(),
  selectionId: uuid('selection_id').notNull().references(() => selectionItems.id, { onDelete: 'cascade' }),
  dependsOnId: uuid('depends_on_id').notNull().references(() => selectionItems.id, { onDelete: 'cascade' }),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Selection options (actual product choices for each selection item)
export const selectionOptions = pgTable('selection_options', {
  id: uuid('id').defaultRandom().primaryKey(),
  selectionItemId: uuid('selection_item_id').notNull().references(() => selectionItems.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  manufacturer: varchar('manufacturer', { length: 255 }),
  modelNumber: varchar('model_number', { length: 255 }),
  retailer: varchar('retailer', { length: 255 }),
  price: integer('price'),
  leadTimeInDays: integer('lead_time_in_days'),
  imageUrls: json('image_urls').$type<string[]>(),
  specificationUrl: text('specification_url'),
  selected: boolean('selected').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Comments on selections
export const selectionComments = pgTable('selection_comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  selectionItemId: uuid('selection_item_id').notNull().references(() => selectionItems.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projectUsers),
  roles: many(userRoles),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  users: many(projectUsers),
  buildings: many(buildings),
  selectionItems: many(selectionItems),
}));

export const projectUsers = pgTable('project_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: varchar('role', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projectUsersRelations = relations(projectUsers, ({ one }) => ({
  project: one(projects, {
    fields: [projectUsers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectUsers.userId],
    references: [users.id],
  }),
}));

export const selectionItemsRelations = relations(selectionItems, ({ one, many }) => ({
  project: one(projects, {
    fields: [selectionItems.projectId],
    references: [projects.id],
  }),
  category: one(categories, {
    fields: [selectionItems.categoryId],
    references: [categories.id],
  }),
  room: one(rooms, {
    fields: [selectionItems.roomId],
    references: [rooms.id],
  }),
  assignedUser: one(users, {
    fields: [selectionItems.assignedTo],
    references: [users.id],
  }),
  creator: one(users, {
    fields: [selectionItems.createdBy],
    references: [users.id],
  }),
  dependencies: many(selectionDependencies, { relationName: 'depends_on' }),
  dependents: many(selectionDependencies, { relationName: 'dependents' }),
  options: many(selectionOptions),
  comments: many(selectionComments),
})); 