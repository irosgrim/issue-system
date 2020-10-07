<template>
    <ul class="options" v-if="toggleOptions" ref="options">
        <li v-for="(option, optionIndex) in options" :key="option">
            <button type="button" class="option-btn" @click="setSelected(optionIndex)">
                {{option}}
            </button>
        </li>
    </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Options extends Vue {
    @Prop() options!: string[];
    @Prop() toggleOptions!: boolean;
    private selectedOption = 0;
    private numberOfOptioons = 0;

    private mounted() {
        // const options = this.$refs.options;
        const optionsElement = this.$refs.options as HTMLElement;
        this.$nextTick(() => {
            const optionsChildren = optionsElement.children;
            this.numberOfOptioons = optionsChildren.length - 1;
            (optionsChildren[this.selectedOption].firstChild as HTMLButtonElement).focus();
        });
        document.addEventListener("keydown", this.keyboardNavigation);
        
    }

    private keyboardNavigation(e: KeyboardEvent) {
        const optionsElement = this.$refs.options as HTMLElement;
        const optionsChildren = optionsElement.children;
        switch (e.key) {
            case "ArrowUp":
                if(this.selectedOption > 0) {
                    this.selectedOption -= 1;
                    console.log(this.selectedOption);
                } else {
                    this.selectedOption = this.numberOfOptioons;
                }

            break;
        case "ArrowDown":
            if(this.selectedOption < this.numberOfOptioons) {
                    this.selectedOption -= 1;
                    console.log(this.selectedOption);
                } else {
                    this.selectedOption = this.numberOfOptioons;
                }
            break;
            
        // case "ArrowUp":
        //     if(selectedOption > 0) {
        //         (optionsChildren[selectedOption].firstChild as HTMLButtonElement).focus()
        //         selectedOption -= 1;
        //     } else {
        //         selectedOption = optionsChildren.length;
        //     }
        //     break;
        // case "ArrowDown":
        //     if(selectedOption < optionsChildren.length - 1) {
        //     selectedOption += 1;
        //         (optionsChildren[selectedOption].firstChild as HTMLButtonElement).focus()
        //     } else {
        //         selectedOption = 0;
        //     }
        //     break;
        case "Escape":
            this.$emit("close");
            break;
        default:
            return;
        }
        e.preventDefault();
  }

    private destroyed() {
        document.removeEventListener("keydown", this.keyboardNavigation);
    }

    private setSelected(option: number) {
        this.$emit('option', option);
    }
}
</script>