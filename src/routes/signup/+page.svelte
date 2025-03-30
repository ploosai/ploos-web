<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  
  export let form: ActionData;
  
  let isLoading = false;
</script>

<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="text-center">
      <a href="/" class="inline-block">
        <span class="text-[color:var(--brand-color)] font-semibold text-4xl">Ploos</span>
      </a>
    </div>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Create your account
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      <a href="/login" class="font-medium text-[color:var(--brand-color)] hover:text-[#00a3cc]">
        sign in to your existing account
      </a>
    </p>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" method="POST" use:enhance={() => {
        isLoading = true;
        return ({ update }) => {
          update({ reset: false });
          isLoading = false;
        };
      }}>
        {#if form?.message}
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {form.message}
                </h3>
              </div>
            </div>
          </div>
        {/if}
        
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <div class="mt-1">
            <input id="name" name="name" type="text" autocomplete="name" required 
              value={form?.name || ''}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[color:var(--brand-color)] focus:border-[color:var(--brand-color)] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1">
            <input id="email" name="email" type="email" autocomplete="email" required 
              value={form?.email || ''}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[color:var(--brand-color)] focus:border-[color:var(--brand-color)] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1">
            <input id="password" name="password" type="password" autocomplete="new-password" required 
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[color:var(--brand-color)] focus:border-[color:var(--brand-color)] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="passwordConfirm" class="block text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <div class="mt-1">
            <input id="passwordConfirm" name="passwordConfirm" type="password" autocomplete="new-password" required 
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[color:var(--brand-color)] focus:border-[color:var(--brand-color)] sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">
            I am a...
          </label>
          <div class="mt-1">
            <select id="role" name="role" required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[color:var(--brand-color)] focus:border-[color:var(--brand-color)] sm:text-sm"
            >
              <option value="homeowner">Homeowner</option>
              <option value="designer">Designer</option>
              <option value="builder">Builder</option>
              <option value="superintendent">Superintendent</option>
              <option value="hoa_board">HOA Board Member</option>
              <option value="municipality">Municipality Representative</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="retailer">Retailer</option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="agree-terms" name="agree-terms" type="checkbox" required
              class="h-4 w-4 text-[color:var(--brand-color)] focus:ring-[color:var(--brand-color)] border-gray-300 rounded"
            />
            <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
              I agree to the <a href="#!" class="text-[color:var(--brand-color)] hover:text-[#00a3cc]">Terms of Service</a> and <a href="#!" class="text-[color:var(--brand-color)] hover:text-[#00a3cc]">Privacy Policy</a>
            </label>
          </div>
        </div>

        <div>
          <button type="submit" 
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[color:var(--brand-color)] hover:bg-[#00a3cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--brand-color)] {isLoading ? 'opacity-75 cursor-not-allowed' : ''}"
            disabled={isLoading}
          >
            {#if isLoading}
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            {:else}
              Create account
            {/if}
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-3">
          <div>
            <a href="#!" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" aria-label="Sign up with GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0110 2.473c.85.004 1.705.115 2.504.337 1.909-1.291 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clip-rule="evenodd" />
              </svg>
              <span class="ml-2">Sign up with GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 