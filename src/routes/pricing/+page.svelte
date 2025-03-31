<script>
  import { onMount } from 'svelte';
  
  // Placeholder for future server-side logic
  let isAuthenticated = false;
  
  // Pricing tiers from the strategy document
  const tiers = [
    {
      name: "Basic",
      price: 39.99,
      description: "The essentials for a smooth home creation journey",
      features: [
        "Guided selection process",
        "Milestone tracking",
        "Photo documentation",
        "Team communication tools",
        "Secure document storage",
        "Timeline visualization",
        "Email updates and reminders"
      ],
      callToAction: "Get Started",
      highlight: false
    },
    {
      name: "Standard",
      price: 69.99,
      description: "Enhanced features for better control and visualization",
      features: [
        "Everything in Basic, plus:",
        "Design style guidance",
        "Interactive timeline with alerts",
        "Homeowner dashboard",
        "Team messaging center",
        "Decision impact preview",
        "Budget tracking",
        "Style compatibility checks"
      ],
      callToAction: "Popular Choice",
      highlight: true
    },
    {
      name: "Premium",
      price: 99.99,
      description: "The ultimate luxury home creation experience",
      features: [
        "Everything in Standard, plus:",
        "AI design recommendations",
        "Virtual design previews",
        "Budget impact forecasting",
        "Real-time customization tools",
        "Detailed analytics",
        "Automated progress tracking",
        "Supply chain monitoring"
      ],
      callToAction: "Go Premium",
      highlight: false
    }
  ];
  
  // Hardware options
  const hardwareOptions = [
    {
      name: "Project Cameras",
      description: "See your home take shape with regular photo updates",
      price: "From $50/month"
    },
    {
      name: "Complete Monitoring Package",
      description: "Camera system with cloud storage and sharing capabilities",
      price: "From $75/month"
    },
    {
      name: "Secure Storage Box",
      description: "On-site secure storage for samples and documents",
      price: "From $75/month"
    }
  ];
  
  // Additional services
  const additionalServices = [
    {
      name: "Lender Reports",
      description: "Professional reports for your mortgage lender",
      price: "From $100 per report"
    },
    {
      name: "HOA Submission Package",
      description: "Organized documentation for HOA approvals",
      price: "From $250 per submission"
    },
    {
      name: "Budget Optimization",
      description: "Expert review to help you get the most value",
      price: "Custom quote"
    },
    {
      name: "Digital Home Model",
      description: "Complete digital twin of your finished home",
      price: "Custom quote"
    }
  ];
</script>

<svelte:head>
  <title>Pricing | Ploos</title>
</svelte:head>

<div class="bg-white">
  <!-- Navigation -->
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16 items-center">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <span class="text-[color:var(--brand-color)] font-semibold text-2xl">Ploos</span>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-4">
          <a href="/" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            Home
          </a>
          <a href="/about" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            About
          </a>
          <a href="/how-it-works" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            How It Works
          </a>
          <a href="/pricing" class="text-gray-900 font-semibold px-3 py-2 rounded-md text-sm font-medium">
            Pricing
          </a>
          <a href="/faq" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            FAQ
          </a>
        </div>
      </div>
      <div class="flex space-x-4">
        <a href="/login" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
          Login
        </a>
        <a href="/signup" class="bg-[color:var(--brand-color)] text-white hover:bg-[#00a3cc] px-3 py-2 rounded-md text-sm font-medium">
          Sign up
        </a>
      </div>
    </div>
  </nav>

  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-5xl">
          Simple Plans for Your Dream Home
        </h1>
        <p class="mt-5 max-w-xl mx-auto text-xl text-gray-500">
          Choose the level of support and features that's right for your luxury home project.
        </p>
      </div>
      
      <!-- Subscription Tiers -->
      <div class="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {#each tiers as tier}
          <div class="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col {tier.highlight ? 'ring-2 ring-[color:var(--brand-color)]' : ''}">
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900">{tier.name}</h3>
              {#if tier.highlight}
                <p class="absolute top-0 -translate-y-1/2 transform rounded-full bg-[color:var(--brand-color)] px-4 py-1.5 text-sm font-semibold text-white">Most popular</p>
              {/if}
              <p class="mt-4 flex items-baseline text-gray-900">
                <span class="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                <span class="ml-1 text-xl font-semibold">/month</span>
                <span class="ml-1 text-sm font-semibold text-gray-500">per seat</span>
              </p>
              <p class="mt-6 text-gray-500">{tier.description}</p>
              
              <!-- Feature List -->
              <ul role="list" class="mt-6 space-y-4">
                {#each tier.features as feature}
                  <li class="flex">
                    <svg class="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="ml-3 text-gray-500">{feature}</span>
                  </li>
                {/each}
              </ul>
            </div>
            
            <a href="/signup" class="mt-8 block w-full bg-{tier.highlight ? '[color:var(--brand-color)]' : 'gray-800'} py-3 px-6 border border-transparent rounded-md text-center font-medium text-white hover:bg-{tier.highlight ? '[#00a3cc]' : 'gray-900'}">
              {tier.callToAction}
            </a>
          </div>
        {/each}
      </div>
      
      <!-- Annual Discount -->
      <div class="mt-8 text-center">
        <p class="text-gray-500">
          Save 15% with annual billing. <a href="/contact" class="text-[color:var(--brand-color)] font-medium">Contact us</a> for more information.
        </p>
      </div>
      
      <!-- Hardware Options -->
      <div class="mt-24">
        <h2 class="text-2xl font-extrabold text-gray-900">Hardware & Monitoring</h2>
        <p class="mt-4 max-w-2xl text-lg text-gray-500">
          Enhance your project with deployable hardware systems that connect your digital plan to physical reality.
        </p>
        
        <div class="mt-8 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-3">
          {#each hardwareOptions as option}
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 class="text-lg font-medium text-gray-900">{option.name}</h3>
              <p class="mt-2 text-gray-500">{option.description}</p>
              <p class="mt-4 text-[color:var(--brand-color)] font-semibold">{option.price}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Additional Services -->
      <div class="mt-24">
        <h2 class="text-2xl font-extrabold text-gray-900">Specialized Services</h2>
        <p class="mt-4 max-w-2xl text-lg text-gray-500">
          Add-on services designed for luxury home projects.
        </p>
        
        <div class="mt-8 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
          {#each additionalServices as service}
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 class="text-lg font-medium text-gray-900">{service.name}</h3>
              <p class="mt-2 text-gray-500">{service.description}</p>
              <p class="mt-4 text-[color:var(--brand-color)] font-semibold">{service.price}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Enterprise -->
      <div class="mt-24">
        <div class="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div class="pt-12 px-6 sm:px-16">
            <h2 class="text-2xl font-extrabold text-gray-900">Enterprise Solutions for Developers & Builders</h2>
            <p class="mt-4 text-lg text-gray-500">
              Custom solutions for luxury real estate developers and custom home builders managing multiple high-value projects.
            </p>
            <div class="mt-8">
              <div class="flex items-center">
                <h3 class="flex-shrink-0 text-2xl font-bold text-[color:var(--brand-color)]">Custom Pricing</h3>
                <div class="ml-4">
                  <p class="text-gray-500">
                    Volume discounts, dedicated support, and custom integrations for your specific workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-6 py-8 sm:px-16 sm:py-10 bg-gray-50 sm:flex sm:items-center sm:justify-between">
            <div class="sm:flex-1">
              <p class="text-sm font-medium text-gray-500">
                Contact our sales team for a custom quote
              </p>
            </div>
            <div class="mt-6 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
              <a href="/contact" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[color:var(--brand-color)] hover:bg-[#00a3cc]">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- FAQ -->
      <div class="mt-24">
        <h2 class="text-2xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
        <div class="mt-6 border-t border-gray-200 pt-10">
          <dl class="space-y-10">
            <div>
              <dt class="text-lg font-medium text-gray-900">How many seats do I need for my project?</dt>
              <dd class="mt-3 text-gray-500">
                We recommend seats for key stakeholders: homeowner, builder/GC, designer, and any project managers. A typical project requires 3-5 seats.
              </dd>
            </div>
            <div>
              <dt class="text-lg font-medium text-gray-900">Can I upgrade or downgrade my plan?</dt>
              <dd class="mt-3 text-gray-500">
                Yes, you can upgrade or downgrade your subscription at any time. Changes take effect at the start of your next billing cycle.
              </dd>
            </div>
            <div>
              <dt class="text-lg font-medium text-gray-900">Do you offer refunds?</dt>
              <dd class="mt-3 text-gray-500">
                We offer a 14-day money-back guarantee for new subscriptions. If you're not satisfied with Ploos, contact us within 14 days for a full refund.
              </dd>
            </div>
            <div>
              <dt class="text-lg font-medium text-gray-900">How do you handle data security?</dt>
              <dd class="mt-3 text-gray-500">
                Ploos takes data security seriously. We implement robust encryption, secure authentication, and adhere to GDPR/CCPA compliance standards. Your project data remains private and secure.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      <!-- CTA -->
      <div class="mt-24 bg-[color:var(--brand-color)] rounded-lg overflow-hidden shadow-xl">
        <div class="px-6 py-12 sm:px-16 sm:py-16">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 class="text-2xl font-extrabold text-white sm:text-3xl">
                Ready to transform your luxury home journey?
              </h2>
              <p class="mt-3 max-w-3xl text-lg text-[#e6faff]">
                Start with a free consultation to see how Ploos can streamline your project, reduce delays, and create a seamless experience for everyone involved.
              </p>
              <div class="mt-8 sm:flex">
                <div class="rounded-md shadow">
                  <a href="/signup" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[color:var(--brand-color)] bg-white hover:bg-gray-50">
                    Get Started
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a href="/contact" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#00a3cc] hover:bg-[#0086a8]">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 