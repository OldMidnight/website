<template>
  <v-card>
    <v-img :src="require(`@/assets/${img}`)" alt="" height="200" contain />
    <v-card-title>
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-card-text>
      <p class="my-1 py-2">{{ description }}</p>
      <span>
        <v-btn color="info" icon :href="link" blank>
          <v-icon>mdi-open-in-new'</v-icon>
          <span class="span pl-1">
            Source
          </span>
        </v-btn>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  }
}
</script>
