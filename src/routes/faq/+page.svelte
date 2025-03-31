<script lang="ts">
  // Import components as needed
  let faqs = [
    {
      question: "What exactly is Ploos?",
      answer: "Ploos is an intelligent platform that guides homeowners, designers, and builders through the luxury home creation process. It combines AI-powered design guidance, sequence-driven project management, and multi-stakeholder collaboration tools to reduce stress, prevent delays, and ensure your vision comes to life exactly as you imagined."
    },
    {
      question: "Who is Ploos designed for?",
      answer: "Ploos is designed for homeowners creating luxury homes in the $1-20 million range, with special focus on the $1-5 million segment. It's equally valuable for the design and building professionals who serve these homeowners, helping them deliver exceptional results with greater efficiency."
    },
    {
      question: "How does Ploos differ from interior design software?",
      answer: "Unlike standalone design tools, Ploos integrates the entire home creation process. It not only helps with aesthetic decisions but connects those decisions to construction sequencing, budget impacts, and stakeholder collaboration. It's not just about what looks good—it's about making the right decisions at the right time, with full visibility into their consequences."
    },
    {
      question: "Do I need to be tech-savvy to use Ploos?",
      answer: "Not at all. Ploos is designed with an intuitive interface that anyone can navigate, regardless of their technical expertise. Our goal is to simplify the complex process of home creation, not add another layer of complexity."
    },
    {
      question: "How does the sequencing feature work?",
      answer: "Ploos analyzes the dependencies between different decisions in your home creation journey and creates a customized sequence that ensures you make choices in the optimal order. For example, it knows that certain cabinet decisions must happen before countertops can be selected. This prevents the classic problem of having to rush decisions or make costly changes because something wasn't decided at the right time."
    },
    {
      question: "Can my existing designer or builder use Ploos?",
      answer: "Absolutely! Ploos is designed to complement the expertise of design and building professionals. We provide role-based access that allows your team to collaborate efficiently while maintaining their established workflows. Many professionals appreciate how Ploos helps them deliver better results and enhanced client experiences."
    },
    {
      question: "What aesthetic styles does Ploos support?",
      answer: "Ploos can support any aesthetic style, from Modern Hill Country to transitional, contemporary, traditional, and beyond. Our platform learns your preferences and adapts to your unique vision, not the other way around."
    },
    {
      question: "How does Ploos help me stay on budget?",
      answer: "Ploos provides real-time visibility into the budget impact of your selections and decisions. It helps identify where you might be overspending or where you could reallocate funds for greater impact. By preventing costly mistakes and rework, it also eliminates many of the unexpected expenses that typically cause budget overruns."
    },
    {
      question: "Is my project information secure?",
      answer: "Yes, security is a top priority. Ploos utilizes enterprise-grade security measures to protect your data. Role-based permissions ensure that stakeholders only see the information relevant to their role, and all communications are secured following industry best practices."
    },
    {
      question: "Where is Ploos currently available?",
      answer: "We're launching first in Westlake, Texas, with plans to expand to other luxury markets across the United States. Our initial focus allows us to provide high-touch support and build strong relationships with local partners."
    },
    {
      question: "What does it cost to use Ploos?",
      answer: "Ploos offers tiered subscription options based on your project needs. Detailed pricing will be available closer to our official launch. We're committed to delivering exceptional value that far exceeds the subscription cost through time savings, reduced stress, prevented errors, and improved outcomes."
    },
    {
      question: "How can I get early access to Ploos?",
      answer: "You can join our waitlist by providing your email on our homepage. Early access will be granted to selected users in our initial launch areas, and we'll be expanding access gradually to ensure we deliver an exceptional experience to each user."
    }
  ];
</script>

<div class="bg-white">
  <!-- Navigation -->
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16 items-center">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-[color:var(--brand-color)] font-semibold text-2xl">Ploos</a>
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
          <a href="/pricing" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
            Pricing
          </a>
          <a href="/faq" class="text-gray-900 font-semibold px-3 py-2 rounded-md text-sm font-medium">
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

  <!-- Header/Hero section -->
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="relative sm:rounded-2xl sm:overflow-hidden py-16 sm:py-24 lg:py-32">
        <div class="px-4 sm:px-6 lg:px-8">
          <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span class="block text-[color:var(--brand-color)]">Frequently Asked Questions</span>
          </h1>
          <p class="mt-6 max-w-lg mx-auto text-center text-xl text-gray-600 sm:max-w-3xl">
            Everything you need to know about creating luxury homes with Ploos
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- FAQ section -->
  <div class="bg-white">
    <div class="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="max-w-2xl lg:mx-auto">
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Common Questions
        </h2>
        <p class="mt-4 text-center text-gray-500">
          Have a different question? Reach out to us via the <a href="/#contact" class="text-[color:var(--brand-color)] font-medium">contact form</a> on our home page.
        </p>
        
        <div class="mt-12 space-y-8">
          {#each faqs as faq, i}
            <div class="bg-white overflow-hidden border-b border-gray-200">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <div class="prose prose-blue text-gray-500 max-w-none">
                <p>{faq.answer}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- CTA section -->
  <div class="bg-[color:var(--brand-color)]">
    <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
        <span class="block">Ready to experience Ploos?</span>
      </h2>
      <p class="mt-4 text-lg leading-6 text-[#b3f0ff]">
        Join our exclusive waitlist for early access to the platform.
      </p>
      <a href="/#waitlist" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[color:var(--brand-color)] bg-white hover:bg-[#e6faff] sm:w-auto">
        Join Our Waitlist
      </a>
    </div>
  </div>
  
  <!-- Footer with navigation -->
  <footer class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
        <div class="px-5 py-2">
          <a href="/" class="text-base text-gray-500 hover:text-gray-900">
            Home
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="/about" class="text-base text-gray-500 hover:text-gray-900">
            About
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="/how-it-works" class="text-base text-gray-500 hover:text-gray-900">
            How It Works
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="/faq" class="text-base text-gray-900 font-medium">
            FAQ
          </a>
        </div>
        <div class="px-5 py-2">
          <a href="/#waitlist" class="text-base text-gray-500 hover:text-gray-900">
            Waitlist
          </a>
        </div>
      </nav>
      <p class="mt-8 text-center text-base text-gray-400">
        &copy; 2024 Ploos, Inc. All rights reserved.
      </p>
    </div>
  </footer>
</div> 