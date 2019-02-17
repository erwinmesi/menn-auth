import Vue from 'vue';
import SnackbarMixin from '~/mixins/Snackbar';
import ErrorHandlerMixin from '~/mixins/ErrorHandler';
import ClearAlertsMixin from '~/mixins/ClearAlerts';

const mixins = [SnackbarMixin, ErrorHandlerMixin, ClearAlertsMixin];

mixins.forEach(mixin => Vue.mixin(mixin));
