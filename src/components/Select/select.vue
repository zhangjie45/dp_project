<template>
    <div class="custom-select" :class="{ open: isOpen, disabled: disabled }">
        <div class="select-trigger" @click="toggleSelect" :class="{ disabled: disabled }">
            <span class="select-value">{{ selectedLabel || placeholder }}</span>
            <span class="select-arrow" :class="{ 'arrow-up': isOpen }"></span>
        </div>
        <div class="select-dropdown" v-show="isOpen">
            <div class="select-option" v-for="option in options" :key="option.value" @click="selectOption(option)" :class="{ selected: option.value === modelValue }">
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    placeholder: {
        type: String,
        default: '请选择'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const selectedLabel = computed(() => {
    const selected = props.options.find((option) => option.value === props.modelValue)
    return selected ? selected.label : ''
})

const toggleSelect = () => {
    // 添加禁用判断
    if (props.disabled) return
    isOpen.value = !isOpen.value
}

const selectOption = (option) => {
    if (props.disabled) return // 添加禁用判断
    emit('update:modelValue', option.value)
    isOpen.value = false
}

// 点击外部关闭下拉框
const handleClickOutside = (event) => {
    if (!event.target.closest('.custom-select')) {
        isOpen.value = false
    }
}

document.addEventListener('click', handleClickOutside)

// 组件销毁时移除事件监听
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.custom-select {
    position: relative;
    width: vw(160);
    height: 24px;

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .select-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 0 vw(10);
        border-radius: 4px;
        background-image: url('./assets/select_bg.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        cursor: pointer;

        &.disabled {
            cursor: not-allowed;
        }

        .select-value {
            flex: 1;
            font-size: vw(12);
            font-weight: 500;
            color: #fff;
        }

        .select-arrow {
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #fff;
            transition: transform 0.3s ease;

            &.arrow-up {
                transform: rotate(180deg);
            }
        }
    }

    .select-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 1000;
        max-height: vh(200);
        overflow-y: auto;
        border-top: none;
        border-radius: 0 0 4px 4px;
        background-image: url('./assets/select_dropdown_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        .select-option {
            padding: vh(8) vw(10);
            font-size: vw(12);
            color: #fff;
            font-weight: 500;
            cursor: pointer;

            &:hover {
                // background-color: #f5f5f5;
                color: #1890ff;
            }

            &.selected {
                // background-color: #e6f7ff;
                color: #1890ff;
            }
        }
    }
}
</style>
