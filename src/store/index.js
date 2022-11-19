import { defineStore } from 'pinia';

export const useStore = defineStore('test', {
    state: () => ({
        number: 1,
        name: 'Pinia'
    }),
    actions: {
        changeName(value) {
            this.name = value;
        },
        changeNumber(value) {
            this.number = value;
        }
    }
})