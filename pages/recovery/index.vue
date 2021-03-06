<template lang="pug">

  client-only
    main.recovery
      h1.recovery__title
        | Reset your password

      form.recovery__form.recovery-form(@submit.prevent="validate")
        .recovery-form__row
          .recovery-form__field.input-field
            input#email.recovery-form__input(
              type="email"
              name="email"
              v-model.trim="email"
              :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }")

            label.recovery-form__label(for="email")
              | Email

            span.recovery-form__helper.helper-text(
              data-error="The field is empty"
              v-if="$v.email.$dirty && !$v.email.required")

            span.recovery-form__helper.helper-text(
              data-error="Incorrect email"
              v-else-if="$v.email.$dirty && !$v.email.email")

        center.recovery__center
          .preloader-wrapper.big.active
            .spinner-layer.spinner-blue-only
              .circle-clipper.left
                .circle
              .gap-patch
                .circle
              .circle-clipper.right
                .circle
          vue-recaptcha.recaptcha(
            ref="recaptcha"
            size="invisible"
            @verify="submit"
            @expired="onCaptchaExpired"
            sitekey="6LeKfEgaAAAAAGqtaoHk9BjYE18zHwoeOmoOCkhq")

          .recovery-form__row
            button.recovery-form__button.btn(
              type="submit"
              name="submitRecover")
              | Submit

      nuxt-link.recovery__link(to="/")
        | Back to Homepage

</template>

<script>

  import VueRecaptcha from "vue-recaptcha"
  import { email, required } from "vuelidate/lib/validators"
  import layout from "@/middleware/layout"

  export default {
    name: "Recovery",
    metaInfo: {
      title: "Otaku Library - Password recovery"
    },
    layout: layout,
    components: {
      VueRecaptcha
    },
    data() {
      return {
      email: "",
      recaptcha: null
      }
    },
    validations: {
      email: { email, required }
    },
    methods: {
      async submit() {
        if (this.$v.$invalid) {
          return this.$v.$touch()
        }

        const RecoveryData = {
          email: this.email
        }

        if (window.screen.width <= 560) {
          document.querySelector(".preloader-wrapper").style.display = "block"
        } else {
          document.querySelector(".auth-progress").style.display = "block"
        }
        await this.$store.dispatch("auth/recoverPassword", RecoveryData)
      },
      validate () {
        this.$refs.recaptcha.execute()
      },
      onCaptchaExpired () {
        this.$refs.recaptcha.reset()
      }
    }
  }

</script>

<style lang="sass" scoped>

  @import "~/assets/styles/utils/vars"
  @import "~/assets/styles/utils/mixins"
  @import "~/assets/styles/modules/shadow"

  .recovery
    top: 0
    left: 0
    right: 0
    bottom: 0
    margin: auto
    position: fixed
    max-width: 400px
    max-height: 640px
    border-radius: 4px
    padding: 20px 20px 20px 20px
    background-color: $color-white-pure
    box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.75)
    +mq(phablet, max)
      max-width: 100%
      max-height: 100%
      border-radius: 0
    +flex(center, center, column)

    &__link
      color: $color-blue-light

    &__title
      font-size: 22px
      padding: 30px 0 30px 0

  .recovery-form
    width: 100%
    text-align: center

    &__row
      max-width: 304px
      margin: 20px auto 20px auto
      &_center
        +flex(center, center, column)

    &__field
      +flex(center, stretch, column)

    &__input
      width: auto !important
      padding: 0 0 0 20px !important

    &__helper
      width: 100%

    &__button
      @extend .shadow-btn
      background-color: $color-aquamarine

  .preloader-wrapper
    display: none
    right: 20px !important
    width: 30px !important
    bottom: 20px !important
    height: 30px !important
    position: absolute !important

</style>
