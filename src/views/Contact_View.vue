<template>
  <div class="contact-container">
    <!-- Sección izquierda: Información de contacto -->
    <div class="contact-info">
      <div class="contact-info-up">
        <div class="contact-info-up-left">
          <p>{{ $t("Contact_Flag") }}</p>
          <div
            class="single-line"
            :style="{ backgroundColor: getHeroColor() }"
          ></div>
        </div>
        <div class="contact-info-up-right">
          <h2>{{ $t("Contact_Title") }}</h2>
          <p :style="{ color: getTextAuxiliarColor() }">
            {{ $t("Contact_Paragraph") }}
          </p>
        </div>
      </div>
      <div class="contact-info-down">
        <div class="info-item">
          <Icon class="icon_contact" icon="line-md:map-marker-filled" />
          <div class="info-item-intern">
            <p>
              <strong>{{ $t("Contact_Address") }}</strong>
            </p>
            <p :style="{ color: getTextAuxiliarColor() }">
              {{ $t("Contact_Address_Value") }}
            </p>
          </div>
        </div>

        <div class="info-item">
          <Icon class="icon_contact" icon="line-md:phone-call-filled" />
          <div class="info-item-intern">
            <p>
              <strong>{{ $t("Contact_Phone") }}</strong>
            </p>
            <p :style="{ color: getTextAuxiliarColor() }">
              {{ $t("Contact_Phone_Value") }}
            </p>
          </div>
        </div>

        <div class="info-item">
          <Icon class="icon_contact" icon="line-md:email-alt-filled" />
          <div class="info-item-intern">
            <p>
              <strong>{{ $t("Contact_Email") }}</strong>
            </p>
            <p :style="{ color: getTextAuxiliarColor() }">
              {{ $t("Contact_Email_Value") }}
            </p>
          </div>
        </div>

        <div class="social-icons">
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-linkedin"></i></a>
          <a href="#"><i class="fa fa-youtube"></i></a>
        </div>
      </div>
    </div>

    <!-- Sección derecha: Formulario -->
    <div class="contact-form" :style="{ backgroundColor: getHeroColor() }">
      <div class="form-group">
        <label for="name" :style="{ color: getPrimaryColor() }">{{
          $t("Contact_Form_Name")
        }}</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          :placeholder="$t('Contact_Form_Name_Value')"
          @focus="onFocus"
          @blur="onBlur"
          :style="{ borderColor: getPrimaryColor() }"
        />
      </div>

      <div class="form-group">
        <label for="email" :style="{ color: getPrimaryColor() }">{{
          $t("Contact_Form_Email")
        }}</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          :placeholder="$t('Contact_Form_Email_Value')"
          @focus="onFocus"
          @blur="onBlur"
          :style="{ borderColor: getPrimaryColor() }"
        />
      </div>

      <div class="form-group">
        <label for="phone" :style="{ color: getPrimaryColor() }">{{
          $t("Contact_Form_Phone")
        }}</label>
        <input
          type="tel"
          id="phone"
          v-model="form.phone"
          :placeholder="$t('Contact_Form_Phone_Value')"
          @focus="onFocus"
          @blur="onBlur"
          :style="{ borderColor: getPrimaryColor() }"
        />
      </div>

      <div class="form-group">
        <label for="message" :style="{ color: getPrimaryColor() }">{{
          $t("Contact_Form_Message")
        }}</label>
        <textarea
          id="message"
          v-model="form.message"
          :placeholder="$t('Contact_Form_Message_Value')"
          @focus="onFocus"
          @blur="onBlur"
          :style="{ borderColor: getPrimaryColor() }"
        ></textarea>
      </div>

      <button id="sendButton" type="submit" @click="sendEmail">
        {{ $t("Contact_Form_Button_Send") }}
      </button>
    </div>
  </div>
</template>
<!-- Se sube? :((())) -->
<script>
//import emailjs from "emailjs-com"; // Importa EmailJS (asegúrate de instalarlo)
import emailjs from "@emailjs/browser";
export default {
  name: "ContactView",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    };
  },
  methods: {
    onFocus(event) {
      event.target.style.borderColor = "orange"; // Cambia el borde al color naranja cuando el input tiene focus
    },
    onBlur(event) {
      event.target.style.borderColor = this.getPrimaryColor(); // Restaura el borde cuando el input pierde el focus
    },
    async sendEmail() {
      const templateParams = {
        user_name: this.form.name,
        user_email: this.form.email,
        message: this.form.message,
        user_phone: this.form.phone,
      };

      try {
        // Reemplaza con tus propios Service ID, Template ID, y Public Key
        const SERVICE_ID = "service_nxvebz4";
        const TEMPLATE_ID = "contact_form";
        const PUBLIC_KEY = "d1_C1Va1lFFO3oWRV";

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

        this.$swal({
          text: "Tu mensaje ha sido enviado\n¡Gracias por comunicarte conmigo!\n🙂",
          icon: "success",
        });

        //Limpieza de datos
        templateParams.user_name = "";
        templateParams.user_email = "";
        templateParams.message = "";
        templateParams.user_phone = "";

        this.form.name = "";
        this.form.email = "";
        this.form.message = "";
        this.form.phone = "";

        console.log("SUCCESS!");
      } catch (error) {
        console.error("FAILED...", error);
      }
    },

    // async sendEmail() {
    //   console.log("Form submitted", this.form);
    //   try {
    //     const templateParams = {
    //       name: this.form.name,
    //       email: this.form.email,
    //       message: this.form.message + " | "+this.form.phone
    //     };

    //     // Usa EmailJS para enviar el correo (asegúrate de configurarlo)
    //     const result = await emailjs.send(
    //       "service_nxvebz4",
    //       "YOUR_TEMPLATE_ID",
    //       templateParams,
    //       "YOUR_USER_ID"
    //     );

    //     if (result.status === 200) {
    //       this.emailSent = true; // Mostrar confirmación de envío
    //       this.resetForm(); // Limpiar el formulario
    //     }
    //   } catch (error) {
    //     console.error("Error al enviar el correo:", error);
    //   }
    // },
  },
};
</script>

<style scoped>
/* Estilos responsivos */
@media (max-width: 400px) {
  .contact-container {
    display: flex;
    flex-direction: column;
    margin: 100px 0% 150px 0% !important;
    padding: 10px !important;
  }

  .contact-info {
    width: 100% !important;
  }

  .contact-info-down {
    display: flex;
    flex-direction: column;
    padding: 20% 7% 0px 7%;
  }

  .contact-form {
    width: 100% !important;
    padding: 20px;
    border-radius: 8px;

  }
}
/* Contenedor principal para alinear ambas secciones (izquierda y derecha) */
.contact-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 40px;
  margin: 5% 10% 5% 10%;
}

.contact-info {
  width: 40%;
}

.contact-info-up {
  /* background-color: red; */
  display: flex;
}

.contact-info-up-left {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* background-color: aqua; */
  /* margin: 0px 5px 0px 5px; */
  height: 100%;

  padding: 20px 10px 10px 0px;
}

.contact-info-up-right h2 {
  font-size: xx-large;
}

.contact-info-up-left p {
  writing-mode: vertical-rl;
  /* Orientación vertical, de derecha a izquierda */
  transform: rotate(180deg);
}

.single-line {
  margin-top: 8px;
  width: 3px;
  height: 50px;
}

.info-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.info-item-intern {
  display: flex;
  flex-direction: column;
}

.icon_contact {
  font-size: 40px;
  margin-right: 20px;
}

.social-icons {
  margin-top: 20px;
}

.social-icons a {
  font-size: 20px;
  margin-right: 15px;
  text-decoration: none;
}

.social-icons a:hover {
  color: orange;
}

/* Sección del formulario */
.contact-form {
  width: 45%;
  padding: 20px;
  border-radius: 8px;
}

.contact-form input,
textarea {
  color: black;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid;
  border-radius: 5px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: orange;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #444;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

#sendButton {
  color: white;
}
</style>
