<template>
  <div class="slogan-home-container">
    <div class="home-content">
      <div class="home-image" @mousemove="parallaxEffect" @mouseleave="resetImage">
        <img id="home-image-2" :src="require('../assets/color-background.png')" alt="img home" />

        <img id="home-image" class="fade-out-image" :src="require('../assets/Home-Image.png')" alt="img home" />
      </div>

      <div id="slogan-home">
        {{ $t('Home_Main_Slogan_P1') }}
        <br>
        {{ $t('Home_Main_Slogan_P2') }}


      </div>
      <button id="contact-button" name="button">{{ $t('Home_Contact_Button') }} </button>
    </div>

    <div class="hero-social-container">
      <ul class="hero-social-ul">
        <li class="hero-social-li">
          <a href="https://ec.linkedin.com/in/alan-pacheco-cueva-b7b3a9223" target="_blank" class="hero-social-item"
            :style="{ color: getHeroColor() }">
            <Icon class="hero-social-icon" icon="ri:linkedin-fill" />
            <!-- <div>LinkedIn</div> -->
          </a>
        </li>
        <li class="hero-social-li">
          <a href="#" target="_blank" class="hero-social-item" :style="{ color: getHeroColor() }">
            <Icon class="hero-social-icon" icon="mingcute:github-fill" />
            <!-- <div>Facebook</div> -->
          </a>
        </li>
        <li class="hero-social-li">
          <a href="#" target="_blank" class="hero-social-item" :style="{ color: getHeroColor() }">
            <Icon class="hero-social-icon" icon="mdi:twitter" />
            <!-- <div>Twitter</div> -->
          </a>
        </li>

      </ul>
      <div class="single-line" :style="{ backgroundColor: getHeroColor() }"></div>
    </div>

  </div>

</template>

<script>
export default {
  // Aquí van las opciones del componente
  name: 'HomeView', // Nombre del componente
  props: {
    // Definición de propiedades que el componente puede recibir
  },
  data() {
    // Datos reactivos del componente
    return {
      message: 'Hello, Vue 3!',

    };
  },
  methods: {
    parallaxEffect(event) {
      const image = event.target;
      const rect = image.getBoundingClientRect();

      // Calcula el desplazamiento basado en la posición del mouse
      const moveX = (event.clientX - rect.left - rect.width / 2) * -0.02;
      const moveY = (event.clientY - rect.top - rect.height / 2) * -0.02;

      // Aplica el margen para mover la imagen
      image.style.marginLeft = `${moveX}px`;
      image.style.marginTop = `${moveY}px`;
    },
    resetImage(event) {
      // Resetea la posición cuando el mouse deja la imagen
      const image = event.target;
      image.style.marginLeft = '0px';
      image.style.marginTop = '0px';
    }
  },
  computed: {
    // Propiedades computadas
  },
  mounted() {
  },

};
</script>

<style scoped>
.hero-social-container {
  position: absolute;
  left: 2%;

  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.hero-social-icon {

  display: inline-block;
  width: 1.5em;
  height: 1.5em;
}

.hero-social-li {
  list-style: none;
}

.single-line {
  width: 3px;
  height: 20%;

}

.slogan-home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  /* Hace que el contenedor ocupe toda la altura de la ventana */

}


.fade-out-image {
  width: 100%;
  height: auto;
  /* Aplica un gradiente de máscara en la parte inferior */
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0));
  /* Para navegadores que no soportan mask-image */
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 97%, rgba(0, 0, 0, 0));
}

.home-content {
  position: relative;
  /* Posiciona el contenido de manera relativa */
  text-align: center;
  /* Centra el texto horizontalmente */
}

.home-image {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Centra la imagen */

  width: 100%;


  background-color: aqua !important;
}

.home-image img {
  transition: margin 0.2s ease-out;
}

#home-image {
  width: 85%;
  z-index: 2 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#home-image-2 {
  width: 150%;
  z-index: 1 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#slogan-home {
  font-size: 3em;
  color: white;
  /* Cambia el color del texto para que sea visible sobre la imagen */
  text-shadow: -2px -1px 4px rgba(0, 0, 0);
  /* Agrega sombra al texto para mejor legibilidad */
  z-index: 3 !important;
  /* Asegura que el texto esté sobre la imagen */
  position: relative;

  margin-top: 30%;
}

#contact-button {
  z-index: 3 !important;
  /* Asegura que el texto esté sobre la imagen */
  position: relative;

  font-size: 1em;
  color: white;
  /* Cambia el color del texto para que sea visible sobre la imagen */
  text-shadow: -2px -1px 4px rgba(0, 0, 0);
  border: 2px solid;
  border-color: white;
  padding: 5px 15px 5px 15px;

  border-radius: 6px;
  background-color: rgb(109, 112, 112, 35%);
}
</style>