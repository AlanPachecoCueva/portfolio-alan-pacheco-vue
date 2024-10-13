<template>
  <v-app :style="{ backgroundColor: getBackgroundColor(), color: getTextColor() }">
    <!-- Cursor -->
    <div>
      <!-- Outer Circle -->
      <div ref="outerCircle" class="circle-cursor circle-cursor-outer" :style="{ borderColor: getContrastColor() }">
      </div>
      <!-- Inner Circle -->
      <div ref="innerCircle" class="circle-cursor circle-cursor-inner" :style="{ backgroundColor: getContrastColor() }">
      </div>


    </div>
    <!-- Cursor -->
    <!-- Aquí va el contenido del navbar -->
    <Nav_Bar :style="{ backgroundColor: getHeaderColor() }" :class="navbarClass"></Nav_Bar>

    <RouterView class="routerContent"></RouterView>

  </v-app>
</template>

<script>
import { RouterView } from "vue-router";
import Nav_Bar from './components/Nav_Bar.vue';

export default {
  name: 'App',

  components: {
    Nav_Bar,
    RouterView
  },

  data() {
    return {
      outerX: 0,
      outerY: 0,
      innerX: 0,
      innerY: 0,
      requestId: null,
      isScrollingDown: false,
      lastScrollPosition: 0,
      isAtTop: true,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    const outerCircle = this.$refs.outerCircle;
    const innerCircle = this.$refs.innerCircle;

    // Mouse move event listener
    document.addEventListener("mousemove", (e) => {
      this.innerX = e.clientX;
      this.innerY = e.clientY;
      innerCircle.style.transform = `translate(${this.innerX - 2}px, ${this.innerY - 2}px)`;
    });

    // Function for the outer circle to follow the inner circle
    const animate = () => {
      this.outerX += (this.innerX - this.outerX) * 0.1;
      this.outerY += (this.innerY - this.outerY) * 0.1;

      outerCircle.style.transform = `translate(${this.outerX - 9}px, ${this.outerY - 9}px)`;

      // Call animate again on the next frame
      this.requestId = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // Listener de mousedown para el click
    document.addEventListener("mousedown", this.handleMouseDown);
  },

  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;

      console.log('currentScrollPosition:', currentScrollPosition); // Añadido para depuración

      if (currentScrollPosition === 0) {
        this.isAtTop = true;
        this.isScrollingDown = false;
      } else {
        this.isAtTop = false;
        this.isScrollingDown = currentScrollPosition > this.lastScrollPosition;
      }

      console.log('isScrollingDown:', this.isScrollingDown); // Añadido para depuración
      console.log('isAtTop:', this.isAtTop); // Añadido para depuración

      this.lastScrollPosition = currentScrollPosition;
    },
    handleMouseDown() {
      const innerCircle = this.$refs.innerCircle;

      innerCircle.classList.add("grow");
      setTimeout(() => {
        innerCircle.classList.remove("grow");
      }, 300);
    }
  },
  computed: {
    navbarClass() {
      return {
        'navbar-hidden': this.isScrollingDown,
        'navbar-visible': !this.isScrollingDown,
        'navbar-transparent': this.isAtTop,
      };
    },
    navbarStyle() {
      return {

      };
    }
  }
};
</script>

<style>
.button {
/*
  background-color: #3498db;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 5px;
  
  background-size: -100% 100%;
  transition: color 0.4s ease-out; */
  /* background: linear-gradient(to right, #000 50%, #CACACA 50%); */
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 5px;
  background-size: 200% 100%;
}

.button:hover {
  animation: backgroundShift 0.7s forwards;
}

@keyframes backgroundShift {
  0% {
    background-size: 200% 100%;
    background-position: left bottom;
  }
  100% {
    background-size: 200% 100%;
    background-position: right bottom;
    color: black;
    font-weight: bold;
  }
}


.routerContent {
  margin-top: 7%;
}

nav {
  animation: fadeInUp 0.5s ease-out forwards;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  /* transition: transform 0.3s ease, background-color 0.3s ease; */
}

.navbar-hidden {
  transform: translateY(-100%);
}

@keyframes fadeOutDown {
  0% {
    transform: translateY(0%);
    /* Empieza fuera de la pantalla */
    opacity: 0;
    /* Comienza invisible */
  }

  50% {
    transform: translateY(-20%);
    /* Se mueve hacia abajo parcialmente */
    opacity: 0.5;
    /* Aumenta la opacidad */
  }

  100% {
    transform: translateY(-100%);
    /* Llega a la posición final */
    opacity: 1;
    /* Se vuelve completamente visible */
  }
}

.navbar-visible {
  animation: fadeInUp 0.5s ease-out forwards;
  position: fixed;
  /* Posición fija para que el navbar se mantenga en la parte superior */
  top: 0;
  width: 100%;
  z-index: 10;

}

@keyframes fadeInUp {
  0% {
    transform: translateY(-100%);
    /* Empieza fuera de la pantalla */
    opacity: 0;
    /* Comienza invisible */
  }

  50% {
    transform: translateY(-20%);
    /* Se mueve hacia abajo parcialmente */
    opacity: 0.5;
    /* Aumenta la opacidad */
  }

  100% {
    transform: translateY(0);
    /* Llega a la posición final */
    opacity: 1;
    /* Se vuelve completamente visible */

  }
}


.navbar-transparent {
  background-color: red !important;
}

/* Para el cursor */
.circle-cursor {
  position: absolute;
  pointer-events: none;
  z-index: 1000;
}

.circle-cursor-outer {
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-radius: 50%;
  transition: all 0.1s ease;
}

.circle-cursor-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  transition: all 0.1s ease;
}

.grow {
  animation: growAnimation 0.3s forwards;
}

@keyframes growAnimation {
  0% {
    width: 6px;
    height: 6px;
  }

  50% {
    width: 10px;
    height: 10px;
  }

  100% {
    width: 6px;
    height: 6px;
  }
}
</style>
