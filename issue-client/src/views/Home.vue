<template>
  <div class="home">
    <ReportIssue/>
  </div>
</template>

<script>
// @ is an alias to /src
import ReportIssue from '@/components/ReportIssue.vue'

export default {
  name: 'Home',
  components: {
    ReportIssue
  }
}
</script>
