<template>
  <!-- Aquí va el HTML del componente -->
  <div class="bigContainer_Skills">
    <div class="leftSide">
      <div class="leftSide_Left">
        <p>{{$t('Skills_Flag')}}</p>
        <div
          class="single-line"
          :style="{ backgroundColor: getHeroColor() }"
        ></div>
      </div>
      <div class="leftSide_Right">
        <div class="leftSide_Up">
          <h2>{{$t('Skills_Title')}}</h2>
          <p>
            {{$t('Skills_Paragraph')}}
          </p>
        </div>
        <div class="leftSide_Down" :style="{ backgroundColor: getTextColor() }">
          <div class="button-container" >
            <input
              class="button"
              :class="{ active: isActive === 'skills' }"
              type="button"
              :value="$t('Skills_Button')"
              @click="setActive('skills')"
              :style="{ color: getPrimaryColor() }"
            />
            <input
              class="button"
              :class="{ active: isActive === 'tools' }"
              type="button"
              :value="$t('Skills_Tools_Button')"
              @click="setActive('tools')"
              :style="{ color: getPrimaryColor() }"
            />
            <!-- El "slider" animado que se mueve entre los botones -->
            <div class="slider" :class="sliderPosition"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightSide">
      <GridComponent
        :items="skills"
        
        v-if="isActive == 'skills'"
      ></GridComponent>
      <GridComponent :items="tools" v-else></GridComponent>
    </div>
  </div>
</template>

<script>
import GridComponent from "../components/utils/Grid_Component.vue";
export default {
  // Aquí van las opciones del componente
  name: "Skills_View", // Nombre del componente
  components: {
    GridComponent,
  },
  props: {
    // Definición de propiedades que el componente puede recibir
  },
  data() {
    // Datos reactivos del componente
    return {
      message: "Hello, Vue 3!",
      isActive: "skills",
      skills: [
        {
          id: 1,
          name: "JavaScript",
          icon: "skill-icons:javascript",
        },
        {
          id: 2,
          name: "TypeScript",
          icon: "skill-icons:typescript",
        },
        {
          id: 2,
          name: "Html5",
          icon: "skill-icons:html",
        },
        {
          id: 3,
          name: "CSS",
          icon: "skill-icons:css",
        },
        {
          id: 3,
          name: "Java",
          icon: "skill-icons:java-dark",
        },
        {
          id: 5,
          name: "C",
          icon: "skill-icons:c",
        },
        {
          id: 5,
          name: "C++",
          icon: "skill-icons:cpp",
        },
        {
          id: 5,
          name: "C#",
          icon: "skill-icons:cs",
        },
        {
          id: 5,
          name: ".NET",
          icon: "skill-icons:dotnet",
        },

        
        {
          id: 5,
          name: "NodeJS",
          icon: "skill-icons:nodejs-dark",
        },
        {
          id: 5,
          name: "Python",
          icon: "skill-icons:python-light",
        },

        {
          id: 5,
          name: "React",
          icon: "skill-icons:react-dark",
        },
        {
          id: 5,
          name: "Unity",
          icon: "skill-icons:unity-dark",
        },

        {
          id: 5,
          name: "Vue",
          icon: "skill-icons:vuejs-dark",
        },

        
      ],
      tools: [
        {
          id: 5,
          name: "Eclipse",
          icon: "skill-icons:eclipse-dark",
        },
        {
          id: 5,
          name: "VS Code",
          icon: "skill-icons:vscode-dark",
        },
        {
          id: 5,
          name: "PostgreSQL",
          icon: "skill-icons:postgresql-light",
        },
        {
          id: 5,
          name: "Git",
          icon: "skill-icons:git",
        },
        {
          id: 5,
          name: "GitHub",
          icon: "skill-icons:github-dark",
        },
        {
          id: 5,
          name: "Anaconda",
          icon: "skill-icons:anaconda-dark",
        },
        {
          id: 5,
          name: "MySql",
          icon: "skill-icons:mysql-light",
        },
        {
          id: 5,
          name: "Figma",
          icon: "skill-icons:figma-dark",
        },
        {
          id: 5,
          name: "Illustrator",
          icon: "skill-icons:illustrator",
        },
        {
          id: 5,
          name: "Photoshop",
          icon: "skill-icons:photoshop",
        },
        {
          id: 5,
          name: "StackOverflow",
          icon: "skill-icons:stackoverflow-dark",
        },
      ],
    };
  },
  methods: {
    setActive(button) {
      this.isActive = button;
    },
  },
  computed: {
    sliderPosition() {
      return this.isActive === "skills" ? "left" : "right";
    },
  },
  mounted() {
    // Hook de ciclo de vida
  },
};
</script>

<style scoped>
.bigContainer_Skills {
  /* background-color: red; */
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin: 5% 0px 5% 0px;
}

.leftSide {
  /* background-color: green; */
  width: 44%;

  display: flex;
  flex-direction: row;

  margin: 15px 0px 0px 5px;

  align-items: center;
  justify-content: start;
}

.leftSide_Left {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* background-color: aqua; */
  /* margin: 0px 5px 0px 5px; */
  height: 100%;

  padding: 20px 10px 10px 0px;
}

.leftSide_Left p {
  writing-mode: vertical-rl;
  /* Orientación vertical, de derecha a izquierda */
  transform: rotate(180deg);
}

.single-line {
  margin-top: 20px;
  width: 3px;
  height: 60px;
}

.leftSide_Up {
  /* background-color: blue; */
  font-size: larger;
}

.leftSide_Up h2 {
  margin: 10px 0px 30px 0px;
  font-weight: bold;
}

.leftSide_Up p {
  /* background-color: blue; */
  font-size: medium;
}

.leftSide_Down {
  margin: 35px 0px 10px 0px;
}

.rightSide {
  /* background-color: aquamarine; */
  width: 44%;
}

.button {
  border-radius: 20px;
  border: 1px solid rgb(255, 255, 255);
  /* background-color: rgb(158, 158, 158); */
}

/* Botones */
.leftSide_Down {
  display: inline-block;
  border-radius: 20px;
  padding: 5px;
  position: relative;
}

.button-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  width:fit-content;
  position: relative;
}

.button {
  background-color: transparent;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1; /* Asegura que los botones estén sobre el slider */
}

/* .button.active {
  color: black;
} */

.slider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background-color: orange;
  border-radius: 20px;
  transition: transform 0.3s ease;
  z-index: 0; /* El slider debe estar debajo de los botones */
}

.slider.left {
  transform: translateX(0);
}

.slider.right {
  transform: translateX(100%);
}
</style>
