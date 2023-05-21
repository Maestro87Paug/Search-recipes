<script>
   import BotonBuscador from "../components/BotonBuscador.svelte";
   import FoodSearch from '../components/FoodSearch.svelte';
   
</script>

<body class="bg-neutral-900">
   <main class="flex flex-col items-center justify-center h-screen">
      <img class="w-20 h-20 mt-40" src="https://www.conave.org/wp-content/uploads/2020/03/recetas-logo.png?2896ec&2896ec" alt="Logo">


      <FoodSearch />
   </main>
   <style>
      @media (min-width: 600px) {
      align-items: center;
      justify-content: center;
      
         /* Estilos específicos para pantallas pequeñas */
   }
   </style>
</body>
