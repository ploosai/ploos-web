<script lang="ts">
	import '../app.css';
	
	// This is a temporary placeholder - in the real app, this will come from auth
	// In this early version, we're just setting it to false
	const isAuthenticated = false;
</script>

{#if isAuthenticated}
	<!-- Authenticated app layout with navigation -->
	<div class="min-h-screen bg-gray-50">
		<header class="bg-white shadow border-b border-gray-200">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex">
						<div class="flex-shrink-0 flex items-center">
							<span class="text-[color:var(--brand-color)] font-semibold text-2xl">Ploos</span>
						</div>
						<nav class="ml-6 flex space-x-8">
							<a href="/dashboard" class="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
								Dashboard
							</a>
							<a href="/projects" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
								Projects
							</a>
							<a href="/selections" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
								Selections
							</a>
						</nav>
					</div>
					<div class="flex items-center">
						<button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--brand-color)]">
							<span class="sr-only">View notifications</span>
							<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
							</svg>
						</button>
						
						<!-- Profile dropdown -->
						<div class="ml-3 relative">
							<div>
								<button type="button" class="max-w-xs bg-[#e6faff] rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--brand-color)] p-1" id="user-menu-button">
									<span class="sr-only">Open user menu</span>
									<span class="h-8 w-8 rounded-full text-[color:var(--brand-color)] flex items-center justify-center font-bold">
										U
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>

		<main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<slot />
		</main>
	</div>
{:else}
	<!-- Public layout without navigation (for landing page) -->
	<slot />
{/if}
