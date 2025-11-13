<template>
    <div style="padding: 15px">
        <ul style="padding: 0 30px">
            <li>
                <button @click="pageJump('/dataPick1')">模版1</button>
            </li>
            <li>
                <button @click="pageJump('/dataPick2')">模版2</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function pageJump (path) {
    router.push(path)
}
</script>
