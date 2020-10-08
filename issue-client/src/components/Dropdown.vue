<template>
    <div class="select">
        <slot></slot>
        <Options 
            v-if="toggleOptions"
            :toggleOptions="toggleOptions" 
            :options="options" 
            :selectedOption="selectedOption"
            @selected="$emit('selected', $event)"
            @close="$emit('close')"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'vue-property-decorator';
import Options from '@/components/Options.vue';

@Component({
    components: {
        Options
    }
})
export default class Dropdown extends Vue {
    @Prop({ default: false }) toggleOptions!: boolean;
    @Prop() options!: string[];
    @Prop() selectedOption!: number;


}
</script>
