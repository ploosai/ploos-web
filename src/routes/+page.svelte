<script lang="ts">
  import { onMount } from 'svelte';
  
  // We'll add authentication checks later
  let isAuthenticated = false;
  
  // Form state
  let waitlistEmail = '';
  let waitlistSubmitting = false;
  let waitlistMessage = { type: '', text: '' };
  
  let contactName = '';
  let contactEmail = '';
  let contactMessage = '';
  let contactSubmitting = false;
  let contactResponse = { type: '', text: '' };
  
  // Handle waitlist submission
  async function handleWaitlistSubmit(event: Event) {
    event.preventDefault();
    waitlistSubmitting = true;
    waitlistMessage = { type: '', text: '' };
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: waitlistEmail })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        waitlistMessage = { type: 'success', text: result.message };
        waitlistEmail = ''; // Clear the form on success
      } else {
        waitlistMessage = { 
          type: 'error', 
          text: result.message || 'An error occurred. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      waitlistMessage = { type: 'error', text: 'An error occurred. Please try again.' };
    } finally {
      waitlistSubmitting = false;
    }
  }
  
  // Handle contact form submission
  async function handleContactSubmit(event: Event) {
    event.preventDefault();
    contactSubmitting = true;
    contactResponse = { type: '', text: '' };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: contactName, 
          email: contactEmail, 
          message: contactMessage 
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        contactResponse = { type: 'success', text: result.message };
        // Clear the form on success
        contactName = '';
        contactEmail = '';
        contactMessage = '';
      } else {
        contactResponse = { 
          type: 'error', 
          text: result.message || 'An error occurred. Please try again.'
        };
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      contactResponse = { type: 'error', text: 'An error occurred. Please try again.' };
    } finally {
      contactSubmitting = false;
    }
  }
</script>

{#if isAuthenticated}
  <!-- Dashboard content (will be moved to /dashboard later) -->
  <div>Dashboard content goes here</div>
{:else}
  <!-- Public landing page -->
  <div class="bg-white">
    <!-- Navigation -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-[color:var(--brand-color)] font-semibold text-2xl">Ploos</span>
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

    <!-- Hero section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div class="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Redefining Luxury</span>
                <span class="block text-[#00ccff]">Home Creation</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Ploos streamlines the entire luxury home project lifecycle – from inspiration and design through construction and maintenance.
              </p>
              <p class="mt-3 text-sm text-[#00ccff] sm:mt-5 sm:text-base sm:max-w-xl sm:mx-auto lg:mx-0 italic">
                From the Ancient Greek "πλοῦς" (ploûs) meaning "journey" or "voyage" – we guide you through the voyage of creating your dream home.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <a href="#waitlist" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#00ccff] hover:bg-[#00a3cc] md:py-4 md:text-lg md:px-10">
                    Join Waitlist
                  </a>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <button on:click={() => {
                    const element = document.getElementById('learn-more');
                    if (element) element.scrollIntoView({behavior: 'smooth'});
                  }} class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#00ccff] bg-[#e6faff] hover:bg-[#b3f0ff] md:py-4 md:text-lg md:px-10">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-[#e6faff]">
        <div class="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <span class="text-[color:var(--brand-color)] text-4xl font-light italic">Luxury Home Interior</span>
        </div>
      </div>
    </div>

    <!-- Feature section -->
    <div class="py-12 bg-white" id="learn-more">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-[color:var(--brand-color)] font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Better Way to Build Luxury Homes
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our integrated, intelligent platform navigates your home creation journey, providing clarity, control, and confidence throughout your voyage.
          </p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[color:var(--brand-color)] text-white">
                  <!-- Placeholder icon -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Sequence-Driven Selection System</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Chart your course with intelligence, reducing decision fatigue and preventing delays with sequencing based on real construction dependencies.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[color:var(--brand-color)] text-white">
                  <!-- Placeholder icon -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Aesthetic Intelligence</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Navigate design waters confidently with AI guidance that ensures coherence and personalization matching your unique style.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[color:var(--brand-color)] text-white">
                  <!-- Placeholder icon -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Dynamic Consequence Modeling</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Foresee the currents of your decisions with real-time impact insights on schedule, budget, and design cohesion.
              </dd>
            </div>

            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[color:var(--brand-color)] text-white">
                  <!-- Placeholder icon -->
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Multi-Stakeholder Integration</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Unite your crew on one collaborative platform connecting homeowners, designers, builders, and suppliers throughout the voyage.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Brand story section -->
    <div class="bg-[#e6faff] py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center mb-10">
          <h2 class="text-base text-[color:var(--brand-color)] font-semibold tracking-wide uppercase">Our Story</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            The Journey Behind Ploos
          </p>
        </div>
        
        <div class="prose prose-lg prose-[color:var(--brand-color)] mx-auto">
          <p>
            The name "Ploos" comes from the Ancient Greek word "πλοῦς" (ploûs), meaning "journey" or "voyage." This concept perfectly encapsulates our mission: to guide you through the voyage of luxury home creation.
          </p>
          <p>
            Just as ancient navigators needed charts, instruments, and expertise to safely reach their destination, today's luxury homeowners need guidance to navigate the complex waters of design decisions, construction timelines, and stakeholder coordination.
          </p>
          <p>
            The waves in our logo symbolize this journey – the ebb and flow of the creative process, the movement toward your destination, and our commitment to making your voyage as smooth as possible. With Ploos as your navigator, the journey of creating your dream home becomes an enjoyable voyage rather than a stressful expedition.
          </p>
        </div>
      </div>
    </div>

    <!-- Waitlist section -->
    <div class="bg-[#00ccff]" id="waitlist">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Ready to begin your journey?</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-[#b3f0ff]">
          Join our waitlist for early access to the Ploos platform. We're launching soon in Westlake, Texas.
        </p>
        
        <form class="mt-8 sm:flex sm:justify-center" on:submit={handleWaitlistSubmit}>
          <div class="min-w-0 flex-1">
            <label for="email" class="sr-only">Email address</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              bind:value={waitlistEmail}
              class="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ccff] focus:border-[#00ccff]"
              required
            >
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <button 
              type="submit" 
              class="block w-full py-3 px-4 rounded-md shadow bg-[#80e6ff] text-white font-medium hover:bg-[#4ddbff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b3f0ff] focus:ring-offset-[#00ccff] disabled:opacity-75 disabled:cursor-not-allowed"
              disabled={waitlistSubmitting}
            >
              {#if waitlistSubmitting}
                <span>Processing...</span>
              {:else}
                <span>Join Waitlist</span>
              {/if}
            </button>
          </div>
        </form>
        
        {#if waitlistMessage.text}
          <div class="mt-4 p-3 rounded {waitlistMessage.type === 'success' ? 'bg-[#1ad1ff] text-[#e6faff]' : 'bg-red-700 text-white'}">
            {waitlistMessage.text}
          </div>
        {/if}
        
        <p class="mt-3 text-sm text-[#b3f0ff]">
          We care about your data. Read our <a href="#!" class="text-white underline">Privacy Policy</a>.
        </p>
      </div>
    </div>

    <!-- Testimonial/Contact section -->
    <div class="bg-white py-16 sm:py-24">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative py-24 px-8 bg-[#00ccff] rounded-xl shadow-2xl overflow-hidden lg:px-16 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div class="relative lg:col-span-1">
            <div class="text-white">
              <h3 class="text-3xl font-extrabold">Luxury Home Creation, Reimagined</h3>
              <p class="mt-6 text-lg">
                Ploos is designed specifically for the luxury home market, focusing on homes valued between $1-20 million, with special attention to the $1-5 million "aspirational luxury" segment.
              </p>
              <p class="mt-4 text-lg">
                Contact us to learn more about our platform and upcoming launch.
              </p>
            </div>
          </div>
          <div class="relative mt-12 sm:mt-16 lg:mt-0">
            <div class="bg-white py-8 px-6 rounded-xl lg:p-8">
              <div class="text-center lg:text-left">
                <h3 class="text-lg font-medium text-gray-900">Contact Us</h3>
                <p class="mt-2 text-sm text-gray-500">
                  Interested in learning more? Send us a message.
                </p>
              </div>
              
              {#if contactResponse.text}
                <div class="mt-4 p-3 rounded {contactResponse.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}">
                  {contactResponse.text}
                </div>
              {/if}
              
              <div class="mt-6">
                <form on:submit={handleContactSubmit} class="grid grid-cols-1 gap-y-6">
                  <div>
                    <label for="contact-name" class="sr-only">Full name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="contact-name" 
                      bind:value={contactName}
                      class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-[color:var(--brand-color)] focus:border-[color:var(--brand-color)] border-gray-300 rounded-md" 
                      placeholder="Full name"
                      required
                    >
                  </div>
                  <div>
                    <label for="contact-email" class="sr-only">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="contact-email" 
                      bind:value={contactEmail}
                      class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-[color:var(--brand-color)] focus:border-[color:var(--brand-color)] border-gray-300 rounded-md" 
                      placeholder="Email"
                      required
                    >
                  </div>
                  <div>
                    <label for="contact-message" class="sr-only">Message</label>
                    <textarea 
                      name="message" 
                      id="contact-message" 
                      rows="4" 
                      bind:value={contactMessage}
                      class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-[color:var(--brand-color)] focus:border-[color:var(--brand-color)] border border-gray-300 rounded-md" 
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <button 
                      type="submit" 
                      class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-[#00ccff] hover:bg-[#00a3cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00ccff] disabled:opacity-75 disabled:cursor-not-allowed"
                      disabled={contactSubmitting}
                    >
                      {#if contactSubmitting}
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      {:else}
                        Send Message
                      {/if}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <div class="text-[#00ccff] font-semibold text-2xl">Ploos</div>
            <p class="text-gray-500 text-base">
              Making luxury home creation seamless, intelligent, and enjoyable.
            </p>
            <div class="flex space-x-6">
              <!-- Social links placeholder -->
              <a href="#!" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Platform
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Resources
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Partners
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="text-base text-gray-500 hover:text-gray-900">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-200 pt-8">
          <p class="text-base text-gray-400 xl:text-center">
            &copy; 2024 Ploos, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
{/if}
