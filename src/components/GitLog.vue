<template>
  <v-row class="elevation-1">
    <v-col v-for="(event, index) in events" cols="12" :key="index" class="p-2">
      <v-row align="center">
        <v-col cols="1">
          <v-avatar size="30" color="error">
            <v-icon>{{ eventIcon(event.type) }}</v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="10">
          <v-card v-if="event.type === 'WatchEvent'" type="3">
            <v-card-text>
              <span class="span">
                Starred Repo at <a :href="event.repo.url">{{ event.repo.name }}</a>
              </span>
            </v-card-text>
          </v-card>
          <v-card v-else-if="event.type === 'CreateEvent'" type="3">
            <v-card-text>
              <span class="span">
                Created {{ event.payload.ref_type }} - <strong>{{ event.payload.ref }}</strong> at <a :href="event.repo.url">{{ event.repo.name }}</a>
              </span>
            </v-card-text>
          </v-card>
          <v-card v-else-if="event.type === 'DeleteEvent'" type="3">
            <v-card-text>
              <span class="span">
                Deleted {{ event.payload.ref_type }} - <strong>{{ event.payload.ref }}</strong> at <a :href="event.repo.url">{{ event.repo.name }}</a>
              </span>
            </v-card-text>
          </v-card>
          <v-card v-else-if="event.type === 'PushEvent'" type="3">
            <v-card-text>
              <span class="span">
                Pushed {{ event.payload.commits.length }} {{ event.payload.commits.length > 1 ? 'commits' : 'commit' }} to <a :href="event.repo.url">{{ event.repo.name }}</a>
              </span>
              <ul>
                <li v-for="commit in event.payload.commits" :key='commit.sha'>{{ commit.message }}</li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card v-else-if="event.type === 'PullRequestEvent'" type="3">
            <v-card-text>
              <span class="span">
                {{ capitalizeFirstLetter(event.payload.action) }} pull request at <a :href="event.payload.pull_request.url">{{ event.repo.name }}</a>
              </span>
            </v-card-text>
          </v-card>
          <v-card v-else-if="event.type === 'PublicEvent'" type="3">
            <v-card-text>
              <span class="span">
                <a :href="event.repo.url">{{ event.repo.name }}</a> made public
              </span>
            </v-card-text>
          </v-card>
          <v-card v-else type="3">mdi
            <v-card-text>
              <span class="span">
                Git event at <a :href="event.repo.url">{{ event.repo.name }}</a>
              </span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GitLog',
  data() {
    return {
      events: []
    };
  },
  created() {
    this.getGithubEvents();
  },
  computed: {
    eventIcon() {
      return (type) => {
        switch (type) {
          case 'WatchEvent':
          return 'mdi-eye'

        case 'CreateEvent':
          return 'mdi-source-branch';

        case 'DeleteEvent':
          return 'mdi-delete';

        case 'PushEvent':
          return 'mdi-source-commit';

        case 'PullRequestEvent':
          return 'mdi-source-pull';

        default:
          return 'mdi-source-repository';
        }
      } 
    }
  },
  methods: {
    async getGithubEvents() {
      let events = await axios.get('https://api.github.com/users/OldMidnight/events/public', {
        headers: {
          Authorization: `token ${process.env.VUE_APP_GITHUB_TOKEN}`
        }
      }).then(response => response.data);
      this.events = events;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
</script>
