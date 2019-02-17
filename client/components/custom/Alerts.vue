<template>
  <div>
    <v-container v-if="alerts.length" class="alert-container">
      <div
        v-for="(alert, i) in alerts"
        :key="i"
        class="alert closable"
        :class="alert.type.color"
        @click="alerts.splice(i, 1)"
        v-html="alert.content"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nuxt.$on("CLEAR_ALERTS", id => {
      this.alerts = id ? this.alerts.filter(alert => alert.id != id) : [];
    });

    this.$nuxt.$on("ADD_ALERT", ({ id, items, type }) => {
      let content = "";

      items = Array.isArray(items) ? items : [items];
      items.forEach(item => {
        content += `<span style="margin-right: 10px">•</span> ${item}<br>`;
      });

      const index = this.alerts.findIndex(alert => alert.content == content);

      const alert = {
        id,
        type: this.types[type],
        content
      };

      index > -1 ? (this.alerts[index] = alert) : this.alerts.push(alert);
    });
  },
  data() {
    return {
      alerts: [],
      types: {
        success: {
          color: "success",
          icon: "check_circle"
        },
        info: {
          color: "info",
          icon: "info"
        },
        warning: {
          color: "warning",
          icon: "priority_high"
        },
        error: {
          color: "error",
          icon: "warning"
        }
      }
    };
  }
};
</script>

<style lang="sass">
@import './../../assets/style/sass/variables.sass'
.alert-container
  padding-top: 10px
  padding-bottom: 10px
.alert
  padding: 16px 32px
  border: 1px solid transparent
  &.primary
    color: $--alert-color-primary !important
    background-color: $--alert-color-background-color-primary !important
    border-color: $--alert-color-border-color-primary !important
  &.success
    color: $--alert-color-success !important
    background-color: $--alert-color-background-color-success !important
    border-color: $--alert-color-border-color-success !important
  &.error
    color: $--alert-color-error !important
    background-color: $--alert-color-background-color-error !important
    border-color: $--alert-color-border-color-error !important
  &.warning
    color: $--alert-color-warning !important
    background-color: $--alert-color-background-color-warning !important
    border-color: $--alert-color-border-color-warning !important
  &.info
    color: $--alert-color-info !important
    background-color: $--alert-color-background-color-info !important
    border-color: $--alert-color-border-color-info !important
  &.closable
    cursor: pointer
</style>