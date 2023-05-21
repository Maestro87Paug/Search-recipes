<script>
  import { onMount } from 'svelte';

  let searchTerm = '';
  let meals = [];
  let showWelcome = true;
  let showPlaceholder = false;
  let showNoResults = false;
  let autocompleteOptions = [];

  async function search() {
    try {
      if (searchTerm === '') {
        showPlaceholder = true;
        meals = [];
        autocompleteOptions = [];
        return;
      }

      showWelcome = false;
      showPlaceholder = false;
      showNoResults = false;

      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        meals = data.meals;
      } else {
        meals = [];
        showNoResults = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAutocompleteOptions() {
    try {
      if (searchTerm === '') {
        autocompleteOptions = [];
        return;
      }

      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        autocompleteOptions = data.meals.slice(0, 5);
      } else {
        autocompleteOptions = [];
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleEnterKey(event) {
    if (event.key === 'Enter') {
      search();
    }
  }

  function handleAutocompleteKey(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      search();
    }
  }

  onMount(() => {
    document.addEventListener('click', () => {
      autocompleteOptions = [];
    });
  });
</script>

<main class="flex flex-col items-center min-h-screen px-4" style="margin-top: 10vh;">
  {#if showWelcome && !meals.length}
    <h1 class="text-gray-200 text-4xl font-bold mb-4 mt-8">¡Bienvenido a mi página!</h1>
    <p class="text-gray-200 max-sm: font-bold mb-4">Podrás hacer búsquedas de recetas y también podrás ver el valor nutricional</p>
  {/if}

  <div class="relative w-full flex justify-center mb-4">
    <div class="w-full md:w-auto">
      <input class="rounded-l-lg border-t border-b border-l border-gray-300 border-solid px-4 py-2 mt-8 w-full md:w-auto" type="text" bind:value={searchTerm} placeholder="Ingresa las iniciales de una receta" on:keydown={handleEnterKey} on:input={fetchAutocompleteOptions} />
      <button class="bg-green-500 hover:bg-green-900 hover:text-lime-500 text-white rounded-r-lg mt-8 px-4 py-2" on:click={search} on:keydown={handleEnterKey}>Buscar</button>
    </div>
    {#if autocompleteOptions.length > 0}
      <ul class="absolute left-0 right-0 bg-white rounded-b-lg border-t border-gray-300 border-solid max-h-40 overflow-y-auto shadow-md z-10 mt-20">
        {#each autocompleteOptions as option}
          <li class="px-4 mt-1 cursor-pointer hover:bg-gray-100" on:click={search} on:keydown={handleAutocompleteKey}>
            <img class="w-8 h-8 object-cover rounded-full mr-2" src={option.strMealThumb} alt={option.strMeal} />
            <span>{option.strMeal}</span>
          </li>
        {/each}
      </ul>
    {/if}
    {#if showPlaceholder}
      <p class="text-red-500 mt-1">Escribe algo para buscar</p>
    {/if}
  </div>
  

  {#if showNoResults}
    <p class="text-red-500">No se encontraron recetas que cumplan con los criterios de búsqueda.</p>
  {/if}

  {#each meals as meal}
    <div class="mt-8 flex flex-col items-center mb-4">
      <img class="h-64 object-cover rounded-lg mt-16" src={meal.strMealThumb} alt={meal.strMeal} />
    </div>

    <div class="text-center">
      <h2 class="text-gray-300 mb-2 mt-8 text-xl">{meal.strMeal}</h2>

      <h3 class="py-2 text-gray-300">Ingredientes:</h3>
      <ul class="mb-4">
        {#each Array.from({ length: 20 }, (_, i) => i + 1) as i}
          {#if meal['strIngredient' + i]}
            <li class="ml-4 text-gray-300">{meal['strIngredient' + i]} - {meal['strMeasure' + i]}</li>
          {/if}
        {/each}
      </ul>

      <h3 class="text-gray-300">Instrucciones:</h3>
      <p class="mx-4 md:mx-72 text-gray-300">{meal.strInstructions}</p>

      {#if meal.strYoutube}
        <button class="mt-2 bg-green-500 hover:bg-green-900 text-white rounded px-4 py-2">
          <a class="hover:text-lime-500" href={meal.strYoutube} target="_blank">Ver video</a>
        </button>
      {/if}
    </div>
  {/each}
</main>
