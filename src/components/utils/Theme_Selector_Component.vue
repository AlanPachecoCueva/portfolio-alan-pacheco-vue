<template>
    <div class="container">
        <div class="button-container">
            <input type="checkbox" class="toggle-button" v-model="isDarkTheme" @click="changeTheme">
            <Icon 
                class="buttonRadius" 
                :class="['animatedLight', { active: isAnimatingLight }]" 
                v-if="isDarkTheme"
                icon="solar:moon-bold" 
                @click="changeTheme" 
            />
            <Icon 
                class="buttonRadius" 
                :class="['animatedDark', { active: isAnimatingDark }]" 
                v-else
                icon="fluent-emoji:sun" 
                @click="changeTheme" 
            />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'

export default {
    name: 'Theme_Selector_Component',
    setup() {
        const theme = useTheme()
        const isDarkTheme = ref(theme.global.name.value === 'dark')
        const isAnimatingLight = ref(false)
        const isAnimatingDark = ref(false)

        function changeTheme() {
            const newTheme = isDarkTheme.value ? 'light' : 'dark'
            
            isDarkTheme.value = newTheme === 'dark'
            isAnimatingLight.value = newTheme === 'dark'
            isAnimatingDark.value = newTheme === 'light'

            theme.global.name.value = newTheme
            localStorage.setItem('theme', newTheme)

            console.log("changeTheme", newTheme)
        }

        onMounted(() => {
            const savedTheme = localStorage.getItem('theme')
            if (savedTheme) {
                theme.global.name.value = savedTheme
                isDarkTheme.value = savedTheme === 'dark'
            }
        })

        return {
            isDarkTheme,
            isAnimatingLight,
            isAnimatingDark,
            changeTheme
        }
    }
}
</script>

<style scoped>
/* :root {
    --bg-color: #cfd8dc;
    --text-color: #212121;
} */

[data-theme="dark"] {
    --bg-color: #263238;
    --text-color: #e0e0e0;
}


.container {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
}

.button-container {
    width: 50px;
    height: 30px;
}

.toggle-button {
    appearance: inherit;
    -webkit-appearance: none;
    outline: none;
    width: 100%;
    height: 100%;
    background-color: #212121;
    border-radius: 30px;
    display: flex;
}

.buttonRadius {
    height: 30px;
    width: 30px;
    border-radius: 15px;

    background-color: #bdbdbd;

    position: relative;
    top: -30px;
    padding: 0px;
}


.animated {
    position: relative;
    left: 0px;
}

.animatedLight.active {
    animation: buttonAnimationToLight 1s ease-out forwards;
}

.animatedDark.active {
    animation: buttonAnimationToDark 1s ease-out forwards;
}


@keyframes buttonAnimationToDark {
    0% {}

    100% {
        transform: translate(70%);
        background-color: #212121;
        transition: .4s;
    }
}

@keyframes buttonAnimationToLight {
    0% {
        transform: translate(70%);
        background-color: #212121;
        transition: .4s;
    }

    100% {
        transform: translate(0%);
        background-color: #bdbdbd;
        transition: .4s;
    }
}
</style>