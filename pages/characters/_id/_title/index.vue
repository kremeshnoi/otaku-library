<template lang='pug'>

  .character
    .character__container
      .character__main-content
        h1.character__title
          | {{ characterById.name }}
          .divider-hidden
          | {{ characterById.name_kanji }}
        .character__cover-container
          img.character__cover(:src='characterById.image_url')

        .character__info.character-info
          h2.character-info__title
            | Info
          ul.character-info__list
            li.character-info__list-item
              | &nbsp;
              .character-info__list-value
                | {{ aboutCharacterData[0] }}
              .character-info__list-icon.material-icons.modal-trigger(
                href='#character-info-modal'
              ) more_horiz

      .character__sub-content
        .character__voice-actors.character-voice-actors
          .character-voice-actors__title
            | Voice Actors

          .character-voice-actors__content(v-if='characterById.voice_actors')
            h4.manga-related__disaster(
              v-if='characterById.voice_actors.length === 0'
            )
              | Not found

            ul.character-voice-actors__tabs.tabs(
              v-if='characterById.voice_actors'
            )
              li.character-voice-actors__tab.tab(
                v-for='(value, name) in characterById.voice_actors',
                :key='name'
              )
                a.character-voice-actors__tab-item(
                  :href='"#" + name',
                  v-if='value.language === "English" || value.language === "Japanese"'
                )
                  | {{ value.name }}

            .character-voice-actors__item(
              :id='name',
              v-for='(value, name) in characterById.voice_actors',
              :key='name'
            )
              table.character-voice-actors__table(
                v-if='value.language === "English" || value.language === "Japanese"'
              )
                tbody.character-voice-actors__tbody
                  tr.character-voice-actors__tr
                    td.character-voice-actors__td
                      img.character-voice-actors__photo(:src='value.image_url')
                      .character-voice-actors__info
                        .character-voice-actors__lang
                          | Language: {{ value.language }}

    #character-info-modal.character-modal.modal
      .character-modal__content.modal-content
        p.character-modal__text
          | {{ aboutCharacterData[0] }}

</template>

<script>

  import jikanjs from 'jikanjs/lib/jikan';
  import Cards from '@/components/elements/Cards';
  import SwiperCarousel from '@/components/elements/SwiperCarousel';
  import layoutMiddleware from '@/middleware/layoutMiddleware';

  export default {
    name: 'Character',
    metaInfo() {
      return {
        title: `Character - ${this.characterById.name}`,
      };
    },
    layout: layoutMiddleware,
    components: {
      Cards,
      SwiperCarousel,
    },
    data() {
      return {
        aboutCharacterData: [],
      };
    },
    async asyncData({ params }) {
      const characterResponse = await jikanjs.loadCharacter(params.id);
      return {
        characterById: characterResponse,
      };
    },
    async created() {
      await this.replaceData();
    },
    mounted() {
      const modal = document.querySelectorAll('.modal');
      const modal_instance = M.Modal.init(modal);
      if (Object.keys(this.characterById.voice_actors).length) {
        const tabs = document.querySelectorAll('.tabs');
        const instanceTabs = M.Tabs.init(tabs);
      }
    },
    methods: {
      async replaceData() {
        const data = this.characterById.about;
        const result = data.replace(/\\n/g, '');
        this.aboutCharacterData.push(result);
      }
    }
  };

</script>

<style lang='sass' scoped>

	@import '~/assets/styles/utils/vars'
	@import '~/assets/styles/utils/mixins'
	@import '~/assets/styles/modules/titles'
	@import '~/assets/styles/modules/dividers'
	@import '~/assets/styles/modules/containers'

	.character
		width: 100%
		&__container
			display: grid
			column-gap: 20px
			row-gap: 40px
			grid-template-columns: 1fr 1fr
			grid-template-areas: 'main sub'
			@extend .container-default
			+mq(tablet-mid, max)
				grid-template-columns: 1fr
				grid-template-areas: 'main' 'sub'
		&__main-content
			grid-area: main
			display: grid
			justify-content: start
			grid-template-areas: 'title title' 'cover info'
			grid-gap: 20px
			align-content: start
			grid-template-rows: 50px auto
			+mq(phablet, max)
				grid-template-rows: auto
				grid-template-areas: 'title' 'cover' 'info'
		&__sub-content
			grid-area: sub
			display: grid
			column-gap: 20px
			row-gap: 40px
			justify-content: flex-start
			align-content: flex-start
			grid-template-columns: minmax(auto, 360px)
			+mq(tablet-mid, max)
				justify-content: flex-start
		&__cover
		&__cover-container
			grid-area: cover
			display: grid
			justify-content: flex-start
			row-gap: 20px
			grid-area: cover
		&__title
			font-size: 20px
			max-width: 460px
			grid-area: title
			text-align: start
			-webkit-line-clamp: 2
			@extend .title-vertical-cut

	.character-info
		grid-area: info
		text-align: start
		+flex(initial, initial, column)
		&__title
			color: $color-black
			width: 100%
			font-size: 16px
			font-weight: 700
			text-align: start
			text-transform: uppercase
			padding: 14px 0 14px 14px
			border-left: 5px solid $color-blue-light
		&__list
			margin: 10px 0 0 0
			height: 100%
			max-width: 300px
			width: 100%
			+flex(flex-start, initial, column)
		&__list-icon
			cursor: pointer
			line-height: 10px
			+mq(phablet, max)
				margin-top: 10px
			&:hover
				color: $color-orange
		&__list-item
			margin: 6px 0
			&:last-of-type
				margin: 0
				height: 100%
				+flex(space-between, initial, column)
		&__list-value
			max-height: 300px
			white-space: pre-wrap
			-webkit-line-clamp: 10
			@extend .title-vertical-cut
			&_decor
				padding: 0 6px
				border-radius: 4px
				color: $color-white-pure
				background-color: $color-yellow
		&__list-values
			margin: 0 10px 0 0
			height: auto
			transition: 0.5s
			display: inline-block
			border-bottom: 1px dashed $color-grey-light
			&:hover
				cursor: pointer
				border-bottom: 1px dashed $color-blue

	.character-voice-actors
		display: grid
		justify-content: start
		grid-gap: 20px
		grid-template-rows: 50px auto
		&__title
			height: 70px
			display: flex
			align-items: center
			@extend .title-default
		&__photo
			width: 100%
			max-width: 140px
		&__tr
			border-bottom: none
		&__td
			display: grid
			grid-template-columns: 1fr 1fr
			grid-gap: 10px
		&__tabs
			display: flex
			flex-wrap: wrap
			overflow-x: initial
			overflow-y: initial
			height: min-content
		&__tab
			height: initial !important
		&__tab-item
			padding: 0 !important
			margin: 0 24px 14px 0
			text-align: start
			line-height: initial
			color: $color-blue-light !important
			&:focus
				background-color: initial !important
			&.active
				background-color: initial !important
				color: $color-orange !important

	.character-modal
		&__text
			white-space: pre-wrap
			text-align: start

</style>