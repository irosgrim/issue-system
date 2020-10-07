<template>
    <div class="select">
        <slot></slot>
        <Options 
            :toggleOptions="toggleOptions" 
            :options="options" 
            @option="setSelected" 
            v-if="toggleOptions"
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
    // @Prop() selected!: number;

    private setSelected(option: number) {
        this.$emit('option', option);
    }

}
</script>

<style lang="scss">

.select {
    position: relative;
    width: 100%;
}

.options {
    position: absolute;
    text-align: left;
    list-style-type: none;
    margin: 0;
    padding: 0;
    right: 0;
    width: 100%;
    background-color: #ffffff;
    width: 100%;
    border-radius: 0 0 5px 0;
    border: 1px solid #e9e9e9;
}

.options li {
    text-transform: uppercase;
    font-size: 0.82rem;
    width: 100%;
}

.option-btn {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0.3rem 6px;

    &:focus {
        border-left: 6px solid blue;
        padding-left: 0;

    }
}

</style>