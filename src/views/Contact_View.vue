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

<script>
import emailjs from "@emailjs/browser";
import { useTheme } from '@/composables/useTheme';

export default {
  name: "ContactView",
  setup() {
    return useTheme()
  },
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
      event.target.style.borderColor = "orange";
    },
    onBlur(event) {
      event.target.style.borderColor = this.getPrimaryColor();
    },
    async sendEmail() {
      const templateParams = {
        user_name: this.form.name,
        user_email: this.form.email,
        message: this.form.message,
        user_phone: this.form.phone,
      };

      try {
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

        this.$swal({
          text: "Tu mensaje ha sido enviado\n¡Gracias por comunicarte conmigo!\n🙂",
          icon: "success",
        });

        this.form.name = "";
        this.form.email = "";
        this.form.message = "";
        this.form.phone = "";
      } catch (error) {
        console.error("FAILED...", error);
      }
    },
  },
};
</script>

<style scoped>
/* ── md: 960–1279px ── */
@media (max-width: 1279px) {
  .contact-container {
    margin: 5% 5%;
    padding: 20px;
    gap: 15px;
  }
}

/* ── sm: 600–959px ── */
@media (max-width: 959px) {
  .contact-container {
    flex-direction: column;
    align-items: center;
    margin: 5% 3%;
    padding: 16px;
  }

  .contact-info {
    width: 95%;
  }

  .contact-form {
    width: 95%;
    margin-top: 20px;
  }
}

/* ── xs: < 600px ── */
@media (max-width: 599px) {
  .contact-container {
    flex-direction: column;
    margin: 5% 0;
    padding: 10px;
  }

  .contact-info {
    width: 100%;
  }

  .contact-info-down {
    padding: 5% 7% 0 7%;
  }

  .contact-form {
    width: 100%;
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
  display: flex;
}

.contact-info-up-left {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;

  padding: 20px 10px 10px 0px;
}

.contact-info-up-right h2 {
  font-size: xx-large;
}

.contact-info-up-left p {
  writing-mode: vertical-rl;
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
