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
    <Nav_Bar :style="{ backgroundColor: getHeaderColor() }" :class="navbarClass" class="navbarAll"></Nav_Bar>

    <RouterView class="routerContent"></RouterView>
  </v-app>
</template>

<script>
import { RouterView } from "vue-router";
import Nav_Bar from "./components/Nav_Bar.vue";
import { useTheme } from '@/composables/useTheme';

export default {
  name: "App",

  components: {
    Nav_Bar,
    RouterView,
  },

  setup() {
    return useTheme()
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
    window.addEventListener("scroll", this.handleScroll);
    const outerCircle = this.$refs.outerCircle;
    const innerCircle = this.$refs.innerCircle;

    document.addEventListener("mousemove", (e) => {
      this.innerX = e.clientX + window.scrollX;
      this.innerY = e.clientY + window.scrollY;
      innerCircle.style.transform = `translate(${this.innerX - 2}px, ${this.innerY - 2}px)`;
    });

    const animate = () => {
      this.outerX += (this.innerX - this.outerX) * 0.1;
      this.outerY += (this.innerY - this.outerY) * 0.1;

      outerCircle.style.transform = `translate(${this.outerX - 9}px, ${this.outerY - 9
        }px)`;

      this.requestId = requestAnimationFrame(animate);
    };

    animate();

    document.addEventListener("mousedown", this.handleMouseDown);
  },

  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition === 0) {
        this.isAtTop = true;
        this.isScrollingDown = false;
      } else {
        this.isAtTop = false;
        this.isScrollingDown = currentScrollPosition > this.lastScrollPosition;
      }

      const deltaY = currentScrollPosition - this.lastScrollPosition;
      this.innerY += deltaY;
      this.outerY += deltaY;

      this.lastScrollPosition = currentScrollPosition;

      const innerCircle = this.$refs.innerCircle;
      const outerCircle = this.$refs.outerCircle;
      innerCircle.style.transform = `translate(${this.innerX - 2}px, ${this.innerY - 2}px)`;
      outerCircle.style.transform = `translate(${this.outerX - 9}px, ${this.outerY - 9}px)`;
    },
    handleMouseDown() {
      const innerCircle = this.$refs.innerCircle;

      innerCircle.classList.add("grow");
      setTimeout(() => {
        innerCircle.classList.remove("grow");
      }, 300);
    },
  },
  computed: {
    navbarClass() {
      return {
        "navbar-hidden": this.isScrollingDown,
        "navbar-visible": !this.isScrollingDown,
        "navbar-transparent": this.isAtTop,
      };
    },
  },
};
</script>

<style>
.button {
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

@media (max-width: 959px) {
  .routerContent {
    margin-top: 62px;
  }
}

nav {
  animation: fadeInUp 0.5s ease-out forwards;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

.navbar-hidden {
  transform: translateY(-100%);
}

@keyframes fadeOutDown {
  0% {
    transform: translateY(0%);
    opacity: 0;
  }

  50% {
    transform: translateY(-20%);
    opacity: 0.5;
  }

  100% {
    transform: translateY(-100%);
    opacity: 1;
  }
}

.navbar-visible {
  animation: fadeInUp 0.5s ease-out forwards;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

@keyframes fadeInUp {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  50% {
    transform: translateY(-20%);
    opacity: 0.5;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
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
