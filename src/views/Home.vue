<template>
  <v-container class="home-container">
    <v-row class="py-3">
      <v-col :cols="isMobile ? '12' : '6'">
        <v-card>
          <v-img src="@/assets/avatar.jpg" alt="" max-height="200" contain />
          <v-card-title>
            <h3>Fareed Idris</h3>
          </v-card-title>
          <v-card-text>
            <p class="my-1 py-2">
              University student and Software Engineer. Enthusiast and Sci-Fi/Space Fan.
            </p>
            <div class="d-flex">
              <span class="info--text mr-3">
                <v-icon color="info">mdi-code-brackets</v-icon>
                Student/Software Engineer
              </span>
              <span class="info--text">
                <v-icon color="info">mdi-map-marker</v-icon>
                Dublin, Ireland
              </span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" href="https://linkedin.com/in/fareed-idris-2021" icon target="_blank">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon href="https://github.com/OldMidnight" target="_blank">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn color="info" icon href="mailto:hi@fareedidris.com" target="_blank">
              <v-icon>mdi-email</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col :cols="isMobile ? '12' : '6'" class="overflow git-events p-2">
        <git-log />
      </v-col>
      <v-col v-for="(project, index) in projects" :key="index" :cols="isMobile ? '12' : '6'" class="d-flex justify-center align-center my-4">
        <project-card v-bind="project"></project-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GitLog from '@/components/GitLog';
import ProjectCard from '@/components/ProjectCard';
import projects from '@/projects';

export default {
  name: 'Home',
  components: { GitLog, ProjectCard },
  data() {
    return {
      projects: projects
    }
  },
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  }
}
</script>

<style lang="scss">
// .git-events {
//   background-color: white;
//   border-radius: 20px;
//   height: 28em;
// }

.home-container {
  padding: 0 20%;
}

</style>
