<template>
  <!-- Cambiamos la clase a "masonry-container" para reflejar el nuevo layout -->
  <div class="masonry-container">
    <!-- Iteramos sobre shuffledImages para barajar las fotos -->
    <div
      v-for="(img, index) in shuffledImages"
      :key="index"
      class="masonry-item"
    >
      <img :src="img.image" :alt="img.title" />

      <!-- Overlay con la info de la imagen -->
      <div class="image-info">
        <h3>{{ img.title }}</h3>
        <p>{{ img.description }}</p>
        <!-- <small>{{ img.date }}</small> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery_View",
  data() {
    return {
      images: [
        {
          image: "/images/KVMIR.jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-01-01",
          sizeFactor: 3,
        },
        {
          image: "/images/KVMIR (2).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-01-15",
          sizeFactor: 2,
        },
        {
          image: "/images/KVMIR (3).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-02-05",
          sizeFactor: 3,
        },
        {
          image: "/images/KVMIR (4).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-02-20",
          sizeFactor: 2,
        },
        {
          image: "/images/KVMIR (5).jpg",
          title: "Proyecto Capstonen",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-03-05",
          sizeFactor: 2,
        },
        {
          image: "/images/KVMIR (6).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-03-20",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (7).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-04-05",
          sizeFactor: 2,
        },
        {
          image: "/images/KVMIR (8).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-04-20",
          sizeFactor: 4,
        },
        {
          image: "/images/KVMIR (9).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-05-05",
          sizeFactor: 3,
        },
        {
          image: "/images/KVMIR (10).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-05-20",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (11).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-06-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (12).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-06-20",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (13).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-07-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (14).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-07-20",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (15).jpg",
          title: "Proyecto Capstone",
          description: "Exposición de proyecto Capstone de graduación: KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (16).jpg",
          title: "Equipo de trabajo",
          description: "Equipo de trabajo del proyecto Capstone KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (17).jpg",
          title: "Exposición Ingennials",
          description: "Exposición en concurso Ingennials con proyecto KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (18).jpg",
          title: "Exposición Ingennials",
          description: "Exposición en concurso Ingennials con proyecto KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (19).jpg",
          title: "Exposición Ingennials",
          description: "Exposición en concurso Ingennials con proyecto KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (20).jpg",
          title: "Exposición Ingennials",
          description: "Exposición en concurso Ingennials con proyecto KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (21).jpg",
          title: "Exposición Ingennials",
          description: "Exposición en concurso Ingennials con proyecto KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (22).jpg",
          title: "Premiación Ingennials",
          description: "Premiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (23).jpg",
          title: "Premiación Ingennialss",
          description: "Premiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (24).jpg",
          title: "Premiación Ingennials",
          description: "Premiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (25).jpg",
          title: "Premiación Ingennials",
          description: "Premiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (26).jpg",
          title: "Premiación Ingennials",
          description: "Premiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (27).jpg",
          title: "Premiación Ingennials",
          description: "Premiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (28).jpg",
          title: "Premiación Ingennials",
          description: "Premiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (29).jpg",
          title: "Premiación Ingennials",
          description: "DPremiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (30).jpg",
          title: "Premiación Ingennials",
          description: "Premiación primer lugar concurso Ingennials - KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (31).jpg",
          title: "Equipo de trabajo",
          description: "Equipo de trabajo del proyecto Capstone KVMI REWARDS",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Graduacion.jpeg",
          title: "Graduación Ing. Software",
          description: "Graduación de Ingeniería en Software UDLA 2024",
          date: "2024-12-15",
          sizeFactor: 1,
        },
        {
          image: "/images/Graduacion (2).jpeg",
          title: "Graduación Ing. Software",
          description: "Graduación de Ingeniería en Software UDLA 2024",
          date: "2024-12-15",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Ayudantia.jpg",
          title: "Capacitación en Ayudantía de Cátedra",
          description: "Brindado capacitación de programación en ayudantía de Software",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia2.jpg",
          title: "Capacitación en Ayudantía de Cátedra",
          description: "Brindado capacitación de programación en ayudantía de Software",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia3.jpg",
          title: "Ayudantia de Cátedra",
          description: "Ensamblaje de robots lego",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia4.jpg",
          title: "Ayudantia de Cátedra",
          description: "Visita de la Ministro de educación y exposición de proyectos",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia5.jpg",
          title: "Ayudantia de Cátedra",
          description: "Visita de la Ministro de educación y exposición de proyectos",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia6.jpg",
          title: "Ayudantia de Cátedra",
          description: "Visita de la Ministro de educación y exposición de proyectos",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia7.jpg",
          title: "Ayudantia de Cátedra",
          description: "Visita de la Ministro de educación y exposición de proyectos",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/BI.jpg",
          title: "Congreso Resiliencia de Negoicios",
          description: "Resiliencia de Negoicios, continuidad operativa y transformación digital",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/BI2.jpg",
          title: "Congreso Resiliencia de Negoicios",
          description: "Resiliencia de Negoicios, continuidad operativa y transformación digital",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/BI3.jpg",
          title: "Congreso Resiliencia de Negoicios",
          description: "Resiliencia de Negoicios, continuidad operativa y transformación digital",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/BI4.jpg",
          title: "Roof Top Banco Internacional",
          description: "Matriz Banco Internacional - Quito",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/BI5.jpg",
          title: "Equipo de Trabajo BI",
          description: "Matriz Banco Internacional - Quito",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Cowid.jpg",
          title: "Aplicación CowID",
          description: "Imagen promocional aplicación CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid2.jpg",
          title: "Exposición Infomatrix",
          description: "Competencia Infomatrix 2023 - Proyecto CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid3.jpg",
          title: "Aplicación CowID",
          description: "Interfaz móvil de la aplicación CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid4.jpg",
          title: "Aplicación CowID",
          description: "Interfaz móvil de la aplicación CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid5.jpg",
          title: "Premiación Infomatrix",
          description: "Premiación Bronce competencia Infomatrix 2023 - Proyecto CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid6.jpg",
          title: "Aplicación CowID",
          description: "Interfaz móvil de la aplicación CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid7.jpg",
          title: "Premiación Infomatrix",
          description: "Premiación Bronce competencia Infomatrix 2023 - Proyecto CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid8.jpg",
          title: "Exposición Infomatrix",
          description: "Competencia Infomatrix 2023 - Proyecto CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid9.jpg",
          title: "Exposición Infomatrix",
          description: "Competencia Infomatrix 2023 - Proyecto CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid10.jpg",
          title: "Exposición Infomatrix",
          description: "Competencia Infomatrix 2023 - Proyecto CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Eduware.jpg",
          title: "Equipo de trabajo Eduware",
          description: "Equipo de trabajo del proyecto Eduware - plataforma educativa con gamificación",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware2.jpg",
          title: "Equipo de trabajo Eduware",
          description: "DEquipo de trabajo del proyecto Eduware - plataforma educativa con gamificación",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware3.jpg",
          title: "Equipo de trabajo Eduware",
          description: "Equipo de trabajo del proyecto Eduware - plataforma educativa con gamificación",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware4.jpg",
          title: "Premiación Ingennials 2022",
          description: "Premiación primer lugar concurso Ingennials 2022 - Proyecto Eduware",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware5.jpg",
          title: "Premiación Ingennials 2022",
          description: "Premiación primer lugar concurso Ingennials 2022 - Proyecto Eduware",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware6.jpg",
          title: "Premiación Ingennials 2022",
          description: "Premiación primer lugar concurso Ingennials 2022 - Proyecto Eduware",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Ingennials.jpg",
          title: "Medalla Ingennials",
          description: "Medalla Primer Lugar",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials2.jpg",
          title: "Medallas Ingennials",
          description: "Medallas Primer Lugar",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials3.jpg",
          title: "Certificado InfoMatrix",
          description: "Certificado de Exposición Infomatrix 2023 - Proyecto CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials4.jpg",
          title: "Certificados y Medalla Infomatrix",
          description: "Certificados de Exposición, Reconocimento y medalla Infomatrix 2023 - Proyecto CowID",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials5.jpg",
          title: "Exposición InfoMatriz",
          description: "Exposición de proyectos",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials6.jpg",
          title: "Medalla Ingennials",
          description: "Medalla Primer Lugar",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials7.jpg",
          title: "Pin Ingeniero de Software",
          description: "Pin de reconocimiento Ingeniero de Software UDLA 2024",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials8.jpg",
          title: "Pin Ingeniero de Software",
          description: "Pin de reconocimiento Ingeniero de Software UDLA 2024",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials9.jpg",
          title: "Medalla Ingennials",
          description: "Medalla Primer Lugar",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials10.jpg",
          title: "Medallas Ingennials",
          description: "Medallas Primer Lugar",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials11.jpg",
          title: "Medallas Ingennials",
          description: "Medallas Primer Lugar",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/PwC.jpg",
          title: "Equipo de trabajo",
          description: "Equipo de trabajo en PwC Ecuador",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/PwC2.jpg",
          title: "Equipo de trabajo",
          description: "Equipo de trabajo en PwC Ecuador",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Robomatrix.jpg",
          title: "Exposición Robomatrix",
          description: "Exposición Robomatrix Machachi 2022 proyecto Cuenta Cuentos VR",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix2.jpg",
          title: "Premiación Robomatrix",
          description: "Premiación tercer lugar Robomatrix Machachi 2022",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix3.jpg",
          title: "Premiación Robomatrix",
          description: "Premiación tercer lugar Robomatrix Machachi 2022",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix4.jpg",
          title: "Premiación Robomatrix",
          description: "Premiación tercer lugar Robomatrix Machachi 2022",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix5.jpg",
          title: "Capacitación Brindada como Ayudante de Cátedra",
          description: "Exposición sobre fundamentos de programación",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix6.jpg",
          title: "Capacitación Brindada como Ayudante de Cátedra",
          description: "Exposición sobre fundamentos de programación",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/U.jpg",
          title: "Graduación Ing. Software",
          description: "Día de graduación Ingeniería en Software UDLA 2024",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/U2.jpg",
          title: "Compañeros de clase",
          description: "Compañeros de clase de Ingeniería en Software UDLA 2024",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/U3.jpg",
          title: "Graduación Ing. Software",
          description: "DDía de graduación Ingeniería en Software UDLA 2024",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Waterslife.jpg",
          title: "Proyecto Water's Life",
          description: "Equipo de trabajo del proyecto Water's Life",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife2.jpg",
          title: "Proyecto Water's Life",
          description: "Equipo de trabajo del proyecto Water's Life",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife3.jpg",
          title: "Proyecto Water's Life",
          description: "Equipo de trabajo del proyecto Water's Life",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife4.jpg",
          title: "Proyecto Water's Life",
          description: "Equipo de trabajo del proyecto Water's Life",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife5.jpg",
          title: "Proyecto Water's Life",
          description: "Equipo de trabajo del proyecto Water's Life",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife6.jpg",
          title: "Proyecto Water's Life",
          description: "DEquipo de trabajo del proyecto Water's Life",
          date: "2025-08-05",
          sizeFactor: 1,
        },
      ],
    };
  },
  computed: {
    shuffledImages() {
      // Baraja aleatoriamente el array cada vez que se renderiza
      return this.images
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    },
  },
};
</script>

<style scoped>
@media (max-width: 400px) {
  .masonry-container {
    margin-top: 55px !important;
  }

  .masonry-container {
    column-count: 2 !important;
    column-gap: 0px;
    margin: 5% 0;
    font-size: 0;
  }
}

/* Layout tipo "masonry" con columnas */
.masonry-container {
  column-count: 4; /* Ajusta la cantidad de columnas (4, 3, 5, etc.) */
  column-gap: 0px; /* Espacio horizontal entre columnas */
  margin: 5% 0;
  font-size: 0;
}

/* Cada "item" debe ser inline-block para respetar su propia altura */
.masonry-item {
  display: inline-block;
  width: 100%;
  margin: 0; /* Espacio vertical entre items */
  position: relative;
  background-color: #fafafa;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden; /* Para el overlay */
  font-size: 20px;
}

/* Imagen */
.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
}

/* Overlay con info (título, descripción, fecha) */
.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.4s ease, transform 0.4s ease;
  padding: 1rem;
}

/* Al pasar el mouse, mostramos la info */
.masonry-item:hover .image-info {
  opacity: 1;
  transform: translateY(0);
}
</style>
