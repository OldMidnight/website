<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col cols="6" class="d-flex align-center">
        <div class="d-flex justify-center w-70 mx-auto">
          <v-img src="@/assets/fareed.jpeg" class="avatar elevation-2"></v-img>
        </div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6" class="d-flex flex-column justify-center align-center">
        <span class="display-3 mb-3">Hi, I'm Fareed!</span>
        <span class="text-center title my-3">I'm a software developer with a passion for building things, Volleyball and Space.</span>
        <span class="caption">Find me on:</span>
        <div>
          <v-btn v-for="social in socials" :key="social.name" :color="social.color" icon :href="social.link" target="_blank" large>
            <v-icon large>{{ social.icon }}</v-icon>
          </v-btn>
        </div>
        <span class="mt-7 font-weight-bold">My latest project: <a href="https://kreoh.com">Kreoh, code reviews for everyone!</a></span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    socials: [
      { name: 'Twitter', icon: 'mdi-twitter', color: 'info', link: 'https://twitter.com/fareed_idris'},
      { name: 'LinkedIn', icon: 'mdi-linkedin', color: 'primary', link: 'https://www.linkedin.com/in/fareed-idris-2021'},
      { name: 'GitHub', icon: 'mdi-github', color: 'black', link: 'https://github.com/OldMidnight'}
    ]
  }),
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  }
}
</script>

<style lang="scss">
.avatar {
  // border: 1px solid black;
  border-radius: 50%;
  width: 60%;
}

.h-100 {
  height: 100%;
}

.w-70 {
  width: 70%;
}
</style>
