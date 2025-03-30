<script lang="ts">
  import { onMount } from 'svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  
  export let data;
  
  // Get display name
  $: displayName = data.user?.name || data.user?.username || 'User';
  
  // Sample data - in a real application, this would come from the server
  const projects = [
    {
      id: '1',
      name: 'Oceanfront Residence',
      address: '1234 Coastal Way, Malibu, CA',
      status: 'in_progress',
      progress: 45,
      pendingSelections: 8,
      urgentSelections: 3
    },
    {
      id: '2',
      name: 'Modern Townhouse',
      address: '567 Urban Avenue, New York, NY',
      status: 'planning',
      progress: 20,
      pendingSelections: 15,
      urgentSelections: 2
    },
    {
      id: '3',
      name: 'Mountain Retreat',
      address: '890 Alpine Road, Aspen, CO',
      status: 'in_progress',
      progress: 60,
      pendingSelections: 5,
      urgentSelections: 1
    }
  ];
  
  const recentSelections = [
    {
      id: '101',
      name: 'Kitchen Countertop Material',
      category: 'Kitchen',
      subcategory: 'Surfaces',
      status: 'pending',
      date: '2023-08-15',
      projectId: '1',
      projectName: 'Oceanfront Residence',
      dueDate: '2023-08-30'
    },
    {
      id: '102',
      name: 'Primary Bathroom Fixtures',
      category: 'Bathroom',
      subcategory: 'Fixtures',
      status: 'approved',
      date: '2023-08-10',
      projectId: '1',
      projectName: 'Oceanfront Residence',
      dueDate: '2023-08-20'
    },
    {
      id: '103',
      name: 'Living Room Flooring',
      category: 'Flooring',
      subcategory: 'Hardwood',
      status: 'in_progress',
      date: '2023-08-12',
      projectId: '3',
      projectName: 'Mountain Retreat',
      dueDate: '2023-08-25'
    },
    {
      id: '104',
      name: 'Exterior Paint Color',
      category: 'Exterior',
      subcategory: 'Paint',
      status: 'pending',
      date: '2023-08-08',
      projectId: '2',
      projectName: 'Modern Townhouse',
      dueDate: '2023-08-22'
    }
  ];

  type StatusType = 'pending' | 'in_progress' | 'approved' | 'ordered' | 'planning' | 'completed';
  
  function getStatusBadgeClass(status: StatusType): string {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-[#e6faff] text-[color:var(--brand-color)]',
      approved: 'bg-green-100 text-green-800',
      ordered: 'bg-purple-100 text-purple-800',
      planning: 'bg-gray-100 text-gray-800',
      completed: 'bg-green-100 text-green-800'
    };
    
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }
</script>

<div>
  <Navigation user={data.user} />
  
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600">Welcome, {displayName}!</p>
    </header>
    
    <!-- Statistics Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Active Projects</h3>
        <p class="text-3xl font-bold text-[color:var(--brand-color)]">{projects.length}</p>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Pending Selections</h3>
        <p class="text-3xl font-bold text-yellow-600">
          {projects.reduce((total, project) => total + project.pendingSelections, 0)}
        </p>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Urgent Selections</h3>
        <p class="text-3xl font-bold text-red-600">
          {projects.reduce((total, project) => total + project.urgentSelections, 0)}
        </p>
      </div>
    </div>
    
    <!-- Projects -->
    <section class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-900">Your Projects</h2>
        <a href="/projects/new" class="text-[color:var(--brand-color)] hover:text-[#00a3cc]">+ New Project</a>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each projects as project}
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-1">
                <a href="/projects/{project.id}" class="hover:text-[color:var(--brand-color)]">{project.name}</a>
              </h3>
              <p class="text-sm text-gray-600 mb-4">{project.address}</p>
              
              <div class="flex items-center mb-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusBadgeClass(project.status as StatusType)}">
                  {project.status.replace('_', ' ')}
                </span>
                <span class="ml-2 text-sm text-gray-600">{project.progress}% complete</span>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p class="text-sm text-gray-600">Pending</p>
                  <p class="text-xl font-semibold text-gray-900">{project.pendingSelections}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Urgent</p>
                  <p class="text-xl font-semibold text-red-600">{project.urgentSelections}</p>
                </div>
              </div>
              
              <a href="/projects/{project.id}" class="text-[color:var(--brand-color)] hover:text-[#00a3cc] text-sm">
                View Project →
              </a>
            </div>
          </div>
        {/each}
      </div>
    </section>
    
    <!-- Recent Selections -->
    <section>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-900">Recent Selections</h2>
        <a href="/selections" class="text-[color:var(--brand-color)] hover:text-[#00a3cc]">View All</a>
      </div>
      
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Selection
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each recentSelections as selection}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="/selections/{selection.id}" class="text-[color:var(--brand-color)] hover:underline">{selection.name}</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <a href="/projects/{selection.projectId}" class="text-gray-900 hover:text-[color:var(--brand-color)]">{selection.projectName}</a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{selection.category}</div>
                  <div class="text-sm text-gray-500">{selection.subcategory}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full {getStatusBadgeClass(selection.status as StatusType)}">
                    {selection.status.replace('_', ' ')}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(selection.dueDate).toLocaleDateString()}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </div>
</div> 