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
        <small>{{ img.date }}</small>
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
          title: "Mi primera imagen",
          description: "Descripción de la primera imagen",
          date: "2025-01-01",
          sizeFactor: 3,
        },
        {
          image: "/images/KVMIR (2).jpg",
          title: "Mi segunda imagen",
          description: "Descripción de la segunda imagen",
          date: "2025-01-15",
          sizeFactor: 2,
        },
        {
          image: "/images/KVMIR (3).jpg",
          title: "Mi tercera imagen",
          description: "Descripción de la tercera imagen",
          date: "2025-02-05",
          sizeFactor: 3,
        },
        {
          image: "/images/KVMIR (4).jpg",
          title: "Mi cuarta imagen",
          description: "Descripción de la cuarta imagen",
          date: "2025-02-20",
          sizeFactor: 2,
        },
        {
          image: "/images/KVMIR (5).jpg",
          title: "Mi quinta imagen",
          description: "Descripción de la quinta imagen",
          date: "2025-03-05",
          sizeFactor: 2,
        },
        {
          image: "/images/KVMIR (6).jpg",
          title: "Mi sexta imagen",
          description: "Descripción de la sexta imagen",
          date: "2025-03-20",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (7).jpg",
          title: "Mi séptima imagen",
          description: "Descripción de la séptima imagen",
          date: "2025-04-05",
          sizeFactor: 2,
        },
        {
          image: "/images/KVMIR (8).jpg",
          title: "Mi octava imagen",
          description: "Descripción de la octava imagen",
          date: "2025-04-20",
          sizeFactor: 4,
        },
        {
          image: "/images/KVMIR (9).jpg",
          title: "Mi novena imagen",
          description: "Descripción de la novena imagen",
          date: "2025-05-05",
          sizeFactor: 3,
        },
        {
          image: "/images/KVMIR (10).jpg",
          title: "Mi décima imagen",
          description: "Descripción de la décima imagen",
          date: "2025-05-20",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (11).jpg",
          title: "Mi imagen once",
          description: "Descripción de la imagen número once",
          date: "2025-06-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (12).jpg",
          title: "Mi imagen doce",
          description: "Descripción de la imagen número doce",
          date: "2025-06-20",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (13).jpg",
          title: "Mi imagen trece",
          description: "Descripción de la imagen número trece",
          date: "2025-07-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (14).jpg",
          title: "Mi imagen catorce",
          description: "Descripción de la imagen número catorce",
          date: "2025-07-20",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (15).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (16).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (17).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (18).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (19).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (20).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (21).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (22).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (23).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (24).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (25).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (26).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (27).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (28).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (29).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (30).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/KVMIR (31).jpg",
          title: "Mi imagen quince",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Graduacion.jpeg",
          title: "Mi graduacion 1",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Graduacion (2).jpeg",
          title: "Mi graduacion 1",
          description: "Descripción de la imagen número quince",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Ayudantia.jpg",
          title: "Ayudantia",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia2.jpg",
          title: "Ayudantia",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia3.jpg",
          title: "Ayudantia",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia4.jpg",
          title: "Ayudantia",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia5.jpg",
          title: "Ayudantia",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia6.jpg",
          title: "Ayudantia",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ayudantia7.jpg",
          title: "Ayudantia",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/BI.jpg",
          title: "BI",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/BI2.jpg",
          title: "BI",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/BI3.jpg",
          title: "BI",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/BI4.jpg",
          title: "BI",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/BI5.jpg",
          title: "BI",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Cowid.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid2.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid3.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid4.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid5.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid6.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid7.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid8.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid9.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Cowid10.jpg",
          title: "CowID",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Eduware.jpg",
          title: "Eduware",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware2.jpg",
          title: "Eduware",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware3.jpg",
          title: "Eduware",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware4.jpg",
          title: "Eduware",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware5.jpg",
          title: "Eduware",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Eduware6.jpg",
          title: "Eduware",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Ingennials.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials2.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials3.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials4.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials5.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials6.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials7.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials8.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials9.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials10.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Ingennials11.jpg",
          title: "Ingennials",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/PwC.jpg",
          title: "PwC",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/PwC2.jpg",
          title: "PwC",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Robomatrix.jpg",
          title: "Robomatrix",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix2.jpg",
          title: "Robomatrix",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix3.jpg",
          title: "Robomatrix",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix4.jpg",
          title: "Robomatrix",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix5.jpg",
          title: "Robomatrix",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Robomatrix6.jpg",
          title: "Robomatrix",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/U.jpg",
          title: "UDLA",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/U2.jpg",
          title: "UDLA",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/U3.jpg",
          title: "UDLA",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        //-----------------------------------------------
        {
          image: "/images/Waterslife.jpg",
          title: "Water's Life",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife2.jpg",
          title: "Water's Life",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife3.jpg",
          title: "Water's Life",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife4.jpg",
          title: "Water's Life",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife5.jpg",
          title: "Water's Life",
          description: "Descripción de la imagen",
          date: "2025-08-05",
          sizeFactor: 1,
        },
        {
          image: "/images/Waterslife6.jpg",
          title: "Water's Life",
          description: "Descripción de la imagen",
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
