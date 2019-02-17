<template>
  <v-layout>
    <v-flex md6>
      <h5 class="headline">MENN | Page for Sample Posting</h5>
      <p>This is a page visible to authenticated users only. Try to add notes.</p>
      <form @submit.prevent="submit">
        <v-text-field
          :error-messages="errors.collect('content')"
          label="Enter a Note"
          name="content"
          v-model="note.content"
          v-validate="'required'"
        />
        <v-btn type="submit">submit</v-btn>
      </form>
      <br>
      <v-list two-line subheader v-if="notes.length">
        <v-subheader>User Notes</v-subheader>
        <v-list-tile v-for="(item, index) in notes" :key="index" avatar>
          <v-list-tile-avatar>
            <v-icon class="grey lighten-1 white--text">edit</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.content }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple @click="remove(item._id)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  layout: "guarded",
  data() {
    return {
      note: {}
    };
  },
  computed: {
    ...mapState({
      notes: ({ note }) => note.list,
      user: ({ user }) => user.user
    })
  },
  async mounted() {
    this.getNotes();
  },
  methods: {
    ...mapActions({
      getNotes: "note/get",
      saveNote: "note/store",
      deleteNote: "note/delete"
    }),
    async remove(id) {
      await this.deleteNote(id);
      toastr.success("Note deleted successfully.");
    },
    async submit() {
      this.clearAlerts("VALIDATION_ERROR");
      if (await this.$validator.validateAll()) {
        const data = { ...this.note };
        data.userId = this.user._id;
        this.saveNote(data)
          .then(() => {
            this.note = {};
            toastr.success("Note created successfully.");
          })
          .catch(error => {
            this.handleError(error, "Failed to add note.");
          });
      }
    }
  }
};
</script>
