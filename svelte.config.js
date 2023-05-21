import netlifyAdapter from '@sveltejs/adapter-netlify';

const config = {
  kit: {
    adapter: netlifyAdapter({
      // Configuración adicional del adaptador si es necesario
    }),
    // Cambia el valor de `appDir` a 'build'
    appDir: 'build'
  }
};

export default config;
