<script lang="ts">
  export let user: { username?: string; name?: string; id: string; };
  
  import { page } from '$app/stores';
  
  let isMenuOpen = false;
  let isProfileMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    isProfileMenuOpen = false;
  }
  
  function toggleProfileMenu() {
    isProfileMenuOpen = !isProfileMenuOpen;
    isMenuOpen = false;
  }
  
  function closeMenus() {
    isMenuOpen = false;
    isProfileMenuOpen = false;
  }
  
  // Get the display name (either name or username)
  $: displayName = user?.name || user?.username || 'User';
  $: firstInitial = displayName[0] || 'U';
</script>

<nav class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-[color:var(--brand-color)] font-semibold text-2xl">Ploos</a>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <a href="/dashboard" class="{$page.url.pathname === '/dashboard' ? 'border-[color:var(--brand-color)] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Dashboard
          </a>
          <a href="/projects" class="{$page.url.pathname.startsWith('/projects') ? 'border-[color:var(--brand-color)] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Projects
          </a>
          <a href="/selections" class="{$page.url.pathname.startsWith('/selections') ? 'border-[color:var(--brand-color)] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Selections
          </a>
          <a href="/calendar" class="{$page.url.pathname.startsWith('/calendar') ? 'border-[color:var(--brand-color)] text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Calendar
          </a>
        </div>
      </div>
      <div class="hidden sm:ml-6 sm:flex sm:items-center">
        <!-- Notifications dropdown - simple version -->
        <div class="relative ml-3">
          <button type="button" class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
            <span class="sr-only">View notifications</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>

        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
            <button type="button" on:click={toggleProfileMenu} class="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--brand-color)]" id="user-menu-button">
              <span class="sr-only">Open user menu</span>
              <div class="h-8 w-8 rounded-full bg-[color:var(--brand-color)] flex items-center justify-center text-white font-medium">
                {firstInitial}
              </div>
            </button>
          </div>
        
          {#if isProfileMenuOpen}
            <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
              <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
              <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
              <form method="POST" action="/logout">
                <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</button>
              </form>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- Mobile menu button -->
      <div class="flex items-center sm:hidden">
        <button type="button" on:click={toggleMenu} class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--brand-color)]">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if isMenuOpen}
    <div class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <a href="/dashboard" class="{$page.url.pathname === '/dashboard' ? 'bg-[#e6faff] border-[color:var(--brand-color)] text-[color:var(--brand-color)]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
          Dashboard
        </a>
        <a href="/projects" class="{$page.url.pathname.startsWith('/projects') ? 'bg-[#e6faff] border-[color:var(--brand-color)] text-[color:var(--brand-color)]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
          Projects
        </a>
        <a href="/selections" class="{$page.url.pathname.startsWith('/selections') ? 'bg-[#e6faff] border-[color:var(--brand-color)] text-[color:var(--brand-color)]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
          Selections
        </a>
        <a href="/calendar" class="{$page.url.pathname.startsWith('/calendar') ? 'bg-[#e6faff] border-[color:var(--brand-color)] text-[color:var(--brand-color)]' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
          Calendar
        </a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-200">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <div class="h-10 w-10 rounded-full bg-[color:var(--brand-color)] flex items-center justify-center text-white font-medium">
              {firstInitial}
            </div>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{displayName}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <a href="/profile" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
            Your Profile
          </a>
          <a href="/settings" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
            Settings
          </a>
          <form method="POST" action="/logout">
            <button type="submit" class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  {/if}
</nav> 