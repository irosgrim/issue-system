<template>
  <div id="app">
      <support />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Support from '@/views/Support.vue';

@Component({
    components: {
        Support
    }
})
export default class App extends Vue {

}
</script>