<!-- src/components/TimeRangePicker.vue -->
<template>
    <div class="time-range-picker">
        <div class="time-range-container">
            <div class="time-input-group" v-if="type === 'time' || type === 'datetime'">
                <label class="time-label" v-if="showLabels">{{ startLabel }}</label>
                <input type="time" class="time-input start-time" :value="startTime" @input="onStartTimeChange" :disabled="disabled" />
            </div>

            <div class="date-input-group" v-if="type === 'date' || type === 'datetime'">
                <label class="date-label" v-if="showLabels">{{ startLabel }}</label>
                <input type="date" class="date-input start-date" :value="startDate" @input="onStartDateChange" :disabled="disabled" />
            </div>

            <div class="separator" v-if="(type === 'time' || type === 'date' || type === 'datetime') && showSeparator">
                {{ separator }}
            </div>

            <div class="time-input-group" v-if="type === 'time' || type === 'datetime'">
                <label class="time-label" v-if="showLabels">{{ endLabel }}</label>
                <input type="time" class="time-input end-time" :value="endTime" @input="onEndTimeChange" :disabled="disabled" />
            </div>

            <div class="date-input-group" v-if="type === 'date' || type === 'datetime'">
                <label class="date-label" v-if="showLabels">{{ endLabel }}</label>
                <input type="date" class="date-input end-date" :value="endDate" @input="onEndDateChange" :disabled="disabled" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({
            startTime: '',
            endTime: '',
            startDate: '',
            endDate: ''
        })
    },
    type: {
        type: String,
        default: 'time', // 'time', 'date', 'datetime'
        validator: (value) => ['time', 'date', 'datetime'].includes(value)
    },
    startLabel: {
        type: String,
        default: '开始时间'
    },
    endLabel: {
        type: String,
        default: '结束时间'
    },
    separator: {
        type: String,
        default: '至'
    },
    showLabels: {
        type: Boolean,
        default: true
    },
    showSeparator: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

// 本地状态
const startTime = ref(props.modelValue.startTime || '')
const endTime = ref(props.modelValue.endTime || '')
const startDate = ref(props.modelValue.startDate || '')
const endDate = ref(props.modelValue.endDate || '')

// 监听外部值变化
watch(
    () => props.modelValue,
    (newVal) => {
        startTime.value = newVal.startTime || ''
        endTime.value = newVal.endTime || ''
        startDate.value = newVal.startDate || ''
        endDate.value = newVal.endDate || ''
    },
    { deep: true }
)

const onStartTimeChange = (event) => {
    startTime.value = event.target.value
    emit('update:modelValue', {
        ...props.modelValue,
        startTime: event.target.value
    })
}

const onEndTimeChange = (event) => {
    endTime.value = event.target.value
    emit('update:modelValue', {
        ...props.modelValue,
        endTime: event.target.value
    })
}

const onStartDateChange = (event) => {
    startDate.value = event.target.value
    emit('update:modelValue', {
        ...props.modelValue,
        startDate: event.target.value
    })
}

const onEndDateChange = (event) => {
    endDate.value = event.target.value
    emit('update:modelValue', {
        ...props.modelValue,
        endDate: event.target.value
    })
}
</script>

<style lang="scss" scoped>
.time-range-picker {
    .time-range-container {
        display: flex;
        align-items: center;
        gap: vw(10);
        flex-wrap: wrap;

        .time-input-group,
        .date-input-group {
            display: flex;
            flex-direction: column;
            gap: vh(5);

            .time-label,
            .date-label {
                font-size: vw(12);
                color: #bcf0fe;
                font-weight: 500;
            }

            .time-input,
            .date-input {
                background: rgba(2, 48, 72, 0.6);
                border: 1px solid #00aaff;
                border-radius: 4px;
                color: #bcf0fe;
                padding: vh(8) vw(12);
                font-size: vw(14);
                transition: all 0.3s ease;
                min-width: vw(120);

                &:focus {
                    outline: none;
                    border-color: #00e0d8;
                    box-shadow: 0 0 vh(5) rgba(0, 224, 216, 0.5);
                }

                &:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                /* 修改时间选择器的内部图标样式 */
                &::-webkit-calendar-picker-indicator {
                    filter: invert(1) brightness(2);
                    cursor: pointer;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                    background: none;
                }

                &::-webkit-calendar-picker-indicator:hover {
                    opacity: 1;
                }

                /* 修改时间选择器的占位符样式 */
                &::-webkit-datetime-edit-fields-wrapper {
                    color: #bcf0fe;
                }

                &::-webkit-datetime-edit-text {
                    color: #00aaff;
                    padding: 0 vw(2);
                }

                &::-webkit-datetime-edit-hour-field,
                &::-webkit-datetime-edit-minute-field,
                &::-webkit-datetime-edit-year-field,
                &::-webkit-datetime-edit-month-field,
                &::-webkit-datetime-edit-day-field {
                    color: #bcf0fe;
                }

                &::-webkit-datetime-edit-hour-field:focus,
                &::-webkit-datetime-edit-minute-field:focus,
                &::-webkit-datetime-edit-year-field:focus,
                &::-webkit-datetime-edit-month-field:focus,
                &::-webkit-datetime-edit-day-field:focus {
                    background-color: rgba(0, 224, 216, 0.2);
                    border-radius: 2px;
                }
            }
        }

        .separator {
            color: #bcf0fe;
            font-size: vw(14);
            font-weight: 500;
            display: flex;
            align-items: flex-end;
            height: 100%;
            padding-bottom: vh(10);
        }
    }
}

/* 响应式布局 */
@media (max-width: 768px) {
    .time-range-container {
        flex-direction: column;
        align-items: stretch !important;

        .separator {
            padding: vh(5) 0;
            text-align: center;
        }
    }
}
</style>
