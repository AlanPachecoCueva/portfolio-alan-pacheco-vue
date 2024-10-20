// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { projects } from "../stores/projects.js";

export const useProjectStore = defineStore({
  id: "project",
  state: () => ({
    project: JSON.parse(localStorage.getItem("project")) || null,
    allProjects: projects, // Almacena todos los proyectos
  }),
  getters: {
    // Getter para acceder a un proyecto específico por ID
    getProject: (state) => {
      return (id) => state.allProjects.find(project => project.title === id);
    },
    // Getter para acceder a todos los proyectos
    getAllProjects: (state) => state.allProjects,
  },
  actions: {
    setProject(project) {
      console.log("Project recibido en store: ", project);
      const { title, description, date, image, url, columns, rows } = project;

      const projectAux = {
        title,
        description,
        date,
        image,
        url,
        columns,
        rows,
      };
      this.project = projectAux;
      // Guardar en localStorage
      localStorage.setItem("project", JSON.stringify(projectAux));
    },
    setIsLogued(isLogued) {
      this.isLogued = isLogued;
      localStorage.setItem("isLogued", JSON.stringify(isLogued));
    },
  },
});
