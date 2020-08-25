<template>
  <div>
    <back-bar>
      play
    </back-bar>

  </div>
</template>

<script>
import BackBar from '@/components/common/BackBar';
import { mapGetters} from 'vuex';
export default {
  components:{
    BackBar
  },
  data() { 
    return {

    };
  },
  computed:{
    ...mapGetters(['curSong'])
  }
};
</script>

<style scoped>
</style>