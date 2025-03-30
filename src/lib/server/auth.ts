import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { verify, hash } from '@node-rs/argon2';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(table.session).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await db
		.select({
			// Adjust user table here to tweak returned data
			user: { id: table.user.id, username: table.user.username },
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.user, eq(table.session.userId, table.user.id))
		.where(eq(table.session.id, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}

// Define all possible user roles in the system
export const ROLES = {
	HOMEOWNER: 'homeowner',
	DESIGNER: 'designer',
	BUILDER: 'builder',
	SUPERINTENDENT: 'superintendent',
	HOA_BOARD: 'hoa_board',
	MUNICIPALITY: 'municipality',
	MANUFACTURER: 'manufacturer',
	RETAILER: 'retailer',
	ADMIN: 'admin'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// Authentication service
export const auth = {
	// Create a new user
	async createUser(userData: {
		email: string;
		password: string;
		name: string;
		role: Role;
	}) {
		const passwordHash = await hash(userData.password);
		
		const newUser = await db.insert(table.user).values({
			email: userData.email,
			passwordHash,
			name: userData.name,
			role: userData.role,
		}).returning();
		
		return newUser[0];
	},
	
	// Verify user credentials and return the user if valid
	async verifyCredentials(email: string, password: string) {
		const user = await db.query.user.findFirst({
			where: eq(table.user.email, email),
		});
		
		if (!user || !user.passwordHash) {
			return null;
		}
		
		const isValid = await verify(user.passwordHash, password);
		
		if (!isValid) {
			return null;
		}
		
		return user;
	},
	
	// Assign additional roles to a user
	async assignRole(userId: string, role: Role, projectId?: string) {
		return db.insert(table.userRole).values({
			userId,
			role,
			...(projectId && { projectId }),
		}).returning();
	},
	
	// Get all roles for a user
	async getUserRoles(userId: string) {
		return db.query.userRole.findMany({
			where: eq(table.userRole.userId, userId),
		});
	},
	
	// Check if a user has a specific role (either global or project-specific)
	async hasRole(userId: string, role: Role, projectId?: string) {
		// Check for the main user role
		const user = await db.query.user.findFirst({
			where: eq(table.user.id, userId),
		});
		
		if (user?.role === role) {
			return true;
		}
		
		// Check additional roles
		const additionalRoles = await db.query.userRole.findMany({
			where: eq(table.userRole.userId, userId),
		});
		
		return additionalRoles.some(r => 
			r.role === role && (!projectId || r.projectId === projectId)
		);
	},
};
