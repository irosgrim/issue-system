<template>
    <ul class="options" v-show="toggleOptions" ref="options" v-click-outside="onClickOutside">
        <li v-for="(option, optionIndex) in options" :key="option">
            <button type="button" class="option-btn" @click="setSelected(optionIndex)" tabindex="0">
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
    @Prop() selectedOption!: number;
    private optionsElement: HTMLElement | undefined = undefined;
    private items: HTMLCollection | undefined = undefined;
    private numberOfOptions = 0;
    private chosenOption = 0;

    private mounted() {
        this.$nextTick(() => {
            this.chosenOption = this.selectedOption;
            this.optionsElement = this.$refs.options as HTMLElement;
            this.items= this.optionsElement.children;
            this.numberOfOptions = this.items.length - 1;
            (this.items[this.chosenOption].firstChild as HTMLButtonElement).focus();
            window.addEventListener("keydown", this.keyboardNavigation);
        });
        
    }

    private keyboardNavigation(e: KeyboardEvent) {
        switch (e.key) {
            case "ArrowUp":
                if(this.chosenOption > 0) {
                    this.chosenOption -= 1;
                    (this.items[this.chosenOption].firstChild as HTMLButtonElement).focus();
                    break;

                } 
                this.chosenOption = this.numberOfOptions;
                (this.items[this.chosenOption].firstChild as HTMLButtonElement).focus();
                break;

            case "ArrowDown":
                if(this.chosenOption < this.numberOfOptions) {
                    this.chosenOption += 1;
                    (this.items[this.chosenOption].firstChild as HTMLButtonElement).focus();
                    break;

                } 
                this.chosenOption = 0;
                (this.items[this.chosenOption].firstChild as HTMLButtonElement).focus();
                break;

            case "Escape":
                this.$emit("close");
                break;

            default:
                return;
        }
        e.preventDefault();
    }

    private handleClickOutside(e: Event) {
        console.log(e.target);
    }

    private destroyed() {
        window.removeEventListener("keydown", this.keyboardNavigation);
    }

    private setSelected(option: number) {
        this.$emit('option', option);
    }

    private onClickOutside() {
        this.$emit('close');
    }
}
</script>