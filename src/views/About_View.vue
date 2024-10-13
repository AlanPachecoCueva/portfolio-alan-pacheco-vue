<template>
  <div class="bigContainerAbout">
    <div class="leftSideAbout">
      <img :src="require('../assets/Home-Image.png')" alt="img home" />
    </div>
    <div class="rightSideAbout">
      <div class="right-leftContainer">
        <p>{{$t('About_Me_Flag')}}</p>
        <div class="single-line" :style="{ backgroundColor: getHeroColor() }"></div>
      </div>
      <div class="right-rightContainer">
        <div class="right-rightContainer-upper">
          <h2>{{ $t('About_Me_Title')}}</h2>
          <p>{{ $t('About_Me_Paragraph')}}
          </p>
        </div>
        <div class="right-rightContainer-lower">
          <input class="button" id="leftButton" type="button" :value="$t('About_Me_Contact_Me')"
          :style="generateAlternativeGradientStyle()" />
          <input class="button" type="button" :value="$t('About_Me_Download_CV')" :style="generateGradientStyle()"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'About_View',
  methods: {
    generateGradientStyle() {
      return {
        // background: `linear-gradient(to right, ${this.getBackgroundColor()} 50%, #CACACA 50%)`
        background: `linear-gradient(to right, ${this.getBackgroundColor()} 50%, #CACACA 50%)`,
        backgroundSize: `200% 100%`
      }

    },
    generateAlternativeGradientStyle() {
      return {
        background: `linear-gradient(to right, ${this.getAlternativeButtonColor()} 50%,  #CACACA 50%)`,
        backgroundSize: `200% 100%`
      }

    }
  }
};
</script>

<style scoped>
.bigContainerAbout {
  display: flex;

  width: 100%;

  justify-content: center;
  align-items: center;

  margin: 5% 0px 5% 0px;
}

.leftSideAbout {
  width: 40%;
}

.rightSideAbout {
  width: 40%;

  display: flex;
  flex-direction: row;

}

.right-leftContainer {
  margin: 15px 5px 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.single-line {

  margin-top: 20px;
  width: 3px;
  height: 20%;

}

.right-leftContainer p {
  writing-mode: vertical-rl;
  /* Orientación vertical, de derecha a izquierda */
  transform: rotate(180deg);
}

.right-rightContainer {
  margin: 0px 5px 0px 5px;
}

.right-rightContainer-upper {
  margin: 5px 5px 5px 5px;
}

.right-rightContainer-upper h2 {
  margin: 10px 0px 10px 0px;
}

.right-rightContainer-upper p {
  margin: 30px 0px 30px 0px;
}

#leftButton {
  margin-right: 30px;
  color: white;
}

</style>