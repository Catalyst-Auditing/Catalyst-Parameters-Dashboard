import { defineStore } from 'pinia';

export const useStore = defineStore('test', {
    state: () => ({
        number: 1,
        category: 'None',
        parameters: {},
        name: 'Pinia'
    }),
    actions: {
        changeName(value) {
            this.name = value;
        },
        changeCategory(value) {
            this.category = value;
        },
        changeParameters(value) {
            this.parameters = value;
        },
        changeNumber(value) {
            this.number = value;
        }
    }
})