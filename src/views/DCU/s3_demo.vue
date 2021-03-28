<template>
  <validation-observer v-slot="{ invalid }">
    <v-container class="h-100">
      <v-row class="h-100">
        <v-col :cols="isMobile ? '12' : '6'" class="d-flex justify-center align-center">
          <v-card :width="isMobile ? '100%' : '50%'">
            <v-card-title>
              Upload a File
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row class="pa-2">
                <validation-provider
                  name="upload"
                  :rules="rules"
                  class="w-100"
                  v-slot="validationContext"
                >
                  <v-file-input
                    v-model="file"
                    color="info"
                    :clearable="false"
                    :show-size="1000"
                    counter
                    chips
                    label="Click to upload an image"
                    prepend-icon="mdi-image"
                    outlined
                    required
                    :loading="loading"
                    :error="getValidationState(validationContext)"
                    :error-messages="validationContext.errors[0]"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip
                        v-if="index < 2"
                        color="deep-purple accent-4"
                        dark
                        label
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </validation-provider>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :loading="loading"
                :disabled="invalid"
                @click="uploadFile"
              >
                Upload
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-divider v-if="!isMobile" vertical></v-divider>
        <v-col :cols="isMobile ? '12' : '6'" class="d-flex flex-column justify-center align-center">
          <span class="title mb-2">Uploaded Files</span>
          <v-data-table
            :headers="headers"
            :items="objects"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:[`item.key`]="{ item }">
              <a :href="`${baseURL}/upload/view/${item.key}`" target="_blank">{{ item.key }}</a>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    color="primary"
                    :href="baseURL + '/upload/' + item.key"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon small>
                      mdi-download
                    </v-icon>
                  </v-btn>
                </template>
                <span>Download</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    small
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteFile(item.key)"
                  >
                    <v-icon small>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { api } from '@/api'
export default {
  components: { ValidationObserver, ValidationProvider },
  data: () => ({
    file: null,
    loading: false,
    objects: [],
    headers: [
      { text: 'File Name', value: 'key' },
      { text: 'Size', value: 'size' },
      { text: '', value: 'actions', sortable: false }
    ],
    baseURL: process.env.VUE_APP_API_URL,
    rules: {
      required: true,
      size: 2000,
      image: true
    }
  }),
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  },
  async created() {
    await this.getImages()
  },
  methods: {
    async getImages() {
      await api.get('/upload/list')
      .then(({ data }) => {
        this.objects = data.length > 0 ? data : []
      })
      .catch((e) => {
        this.$root.$emit('showSnackbar', { color: 'error', message: e.response.data.message })
      })
    },
    async uploadFile() {
      this.loading = true;
      if (
        typeof this.file !== 'undefined' &&
        this.file !== null &&
        this.file !== ''
      ) {
        const formData = new FormData()
        formData.append('upload', this.file)
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        await api
          .post('/upload/', formData, config)
          .then(({ data }) => {
            this.$root.$emit('showSnackbar', { color: 'success', message: data.message })
          })
          .catch((e) => {
            this.$root.$emit('showSnackbar', { color: 'error', message: e.response.data.message })
          })
        this.file = null
        await this.getImages()
      }
      this.loading = false
    },
    async deleteFile(name) {
      await api.delete(`/upload/${name}`)
        .then(() => {
          this.$root.$emit('showSnackbar', { color: 'success', message: 'Image Deleted' })
        })
        .catch((e) => {
          this.$root.$emit('showSnackbar', { color: 'error', message: e.response.data.message })
        })
      await this.getImages()
    },
    getValidationState({ dirty, validated, valid = null}) {
      return dirty || validated ? !valid : false;
    }
  }
}
</script>

<style lang="scss" scoped>
.h-100 {
  height: 100% !important;
}

.w-100 {
  width: 100% !important;
}
</style>