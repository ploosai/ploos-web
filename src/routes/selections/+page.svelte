<script lang="ts">
  // Later this will be fetched from an API
  const categories = [
    {
      name: "Hardware",
      subcategories: ["Cabinet Hardware", "Door Hardware", "Window Hardware", "Bathroom Hardware", "Specialty Hardware"]
    },
    {
      name: "Plumbing Fixtures",
      subcategories: ["Sinks", "Faucets", "Tubs", "Tub Fillers", "Showers", "Shower Controls", "Toilets", "Drains & Disposal"]
    },
    {
      name: "Cabinetry & Built-ins",
      subcategories: ["Cabinet Types", "Built-ins"]
    },
    {
      name: "Flooring",
      subcategories: ["Hard Flooring", "Soft Flooring", "Flooring Transitions"]
    },
    {
      name: "Trim & Molding",
      subcategories: ["Baseboard", "Crown Molding", "Wall Trim", "Door & Window Trim", "Ceiling Trim"]
    },
    {
      name: "Surface Treatments",
      subcategories: ["Wall Treatments", "Ceiling Treatments"]
    },
    {
      name: "Doors",
      subcategories: ["Interior Doors", "Exterior Doors"]
    },
    {
      name: "Windows",
      subcategories: ["Window Types"]
    },
    {
      name: "Shades & Screens",
      subcategories: ["Window Shades", "Window Blinds", "Shutters", "Drapery", "Screens"]
    },
    {
      name: "Lighting",
      subcategories: ["Light Fixtures", "Lighting Controls"]
    },
    {
      name: "Electrical Components",
      subcategories: ["Electrical Outlets", "Electrical Switches", "Low Voltage"]
    },
    {
      name: "Appliances",
      subcategories: ["Refrigeration", "Cooking", "Cleanup", "Laundry"]
    },
    {
      name: "Furniture",
      subcategories: ["Seating", "Tables", "Storage", "Beds", "Outdoor Furniture"]
    },
    {
      name: "Smart Home Systems",
      subcategories: ["Climate Control", "Security", "Entertainment", "Automation"]
    }
  ];

  // Simulate authentication (we'll update this later)
  const isAuthenticated = false;
</script>

<svelte:head>
  <title>Selections | Ploos</title>
</svelte:head>

{#if !isAuthenticated}
  <!-- For unauthenticated users, show a preview with login/signup prompts -->
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Your Home, Your Choices
        </h1>
        <p class="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
          Ploos makes it easy to create a home that feels like you. We guide you through each selection at exactly the right time, so your dream home comes together beautifully.
        </p>
      </div>
      
      <div class="mt-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {#each categories as category}
            <div class="pt-6">
              <div class="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div class="-mt-6">
                  <div>
                    <span class="inline-flex items-center justify-center p-3 bg-[color:var(--brand-color)] rounded-md shadow-lg">
                      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </span>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">{category.name}</h3>
                  <p class="mt-5 text-base text-gray-500">
                    {#each category.subcategories as subcategory, i}
                      {subcategory}{i < category.subcategories.length - 1 ? ', ' : ''}
                    {/each}
                  </p>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="mt-16 text-center">
        <p class="text-xl text-gray-500 mb-8">
          With Ploos, you'll never feel overwhelmed by choices. Our platform guides you through each decision, shows you how everything works together, and keeps your project running smoothly.
        </p>
        <div class="inline-flex rounded-md shadow">
          <a href="/signup" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[color:var(--brand-color)] hover:bg-[#00a3cc]">
            Sign Up for Access
          </a>
        </div>
        <div class="mt-3 inline-flex">
          <a href="/login" class="text-base font-medium text-[color:var(--brand-color)] hover:text-[#00a3cc]">
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  </div>
{:else}
  <!-- For authenticated users, display the full selection interface (to be built later) -->
  <div>
    <p>Selection management interface would go here for logged-in users.</p>
  </div>
{/if} 