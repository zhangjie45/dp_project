<template>
    <teleport to="body">
        <div v-if="modelValue" class="dialog-wrapper" @click="handleWrapperClick">
            <div class="dialog-overlay"></div>
            <div class="dialog-container" :class="[`dialog-size-${size}`, customClass]" @click.stop>
                <!-- Dialog Header -->
                <div class="dialog-header" v-if="showHeader">
                    <div class="dialog-title">{{ title }}</div>
                    <button v-if="showClose" class="dialog-close" @click="closeDialog" aria-label="关闭">
                        <span class="close-icon">×</span>
                    </button>
                </div>

                <!-- Dialog Body -->
                <div class="dialog-body">
                    <slot></slot>
                </div>

                <!-- Dialog Footer -->
                <div class="dialog-footer" v-if="$slots.footer || showFooter">
                    <slot name="footer">
                        <button v-if="showCancel" class="dialog-button dialog-button-cancel" @click="handleCancel">
                            {{ cancelText }}
                        </button>
                        <button v-if="showConfirm" class="dialog-button dialog-button-confirm" @click="handleConfirm" :loading="confirmLoading">
                            {{ confirmText }}
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    // 控制对话框显示/隐藏
    modelValue: {
        type: Boolean,
        default: false
    },
    // 对话框标题
    title: {
        type: String,
        default: '提示'
    },
    // 对话框尺寸
    size: {
        type: String,
        default: 'medium', // small, medium, large
        validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    // 自定义类名
    customClass: {
        type: String,
        default: ''
    },
    // 是否显示关闭按钮
    showClose: {
        type: Boolean,
        default: true
    },
    // 是否显示头部
    showHeader: {
        type: Boolean,
        default: true
    },
    // 是否显示底部
    showFooter: {
        type: Boolean,
        default: false
    },
    // 是否显示取消按钮
    showCancel: {
        type: Boolean,
        default: false
    },
    // 是否显示确认按钮
    showConfirm: {
        type: Boolean,
        default: false
    },
    // 取消按钮文本
    cancelText: {
        type: String,
        default: '取消'
    },
    // 确认按钮文本
    confirmText: {
        type: String,
        default: '确定'
    },
    // 点击遮罩层是否关闭对话框
    closeOnClickModal: {
        type: Boolean,
        default: true
    },
    // 按 ESC 键是否关闭对话框
    closeOnPressEscape: {
        type: Boolean,
        default: true
    },
    // 确认按钮加载状态
    confirmLoading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'close', 'confirm', 'cancel'])

// 关闭对话框
const closeDialog = () => {
    emit('update:modelValue', false)
    emit('close')
}

// 处理遮罩层点击
const handleWrapperClick = () => {
    if (props.closeOnClickModal) {
        closeDialog()
    }
}

// 处理确认按钮点击
const handleConfirm = () => {
    emit('confirm')
    if (!props.confirmLoading) {
        closeDialog()
    }
}

// 处理取消按钮点击
const handleCancel = () => {
    emit('cancel')
    closeDialog()
}

// 监听 ESC 键
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
    if (props.closeOnPressEscape) {
        document.addEventListener('keydown', handleKeyDown)
    }
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (event) => {
    if (event.key === 'Escape' && props.modelValue) {
        closeDialog()
    }
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
}

.dialog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: opacity 0.3s ease;
}

.dialog-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    animation: dialogFadeIn 0.3s ease;

    &.dialog-size-small {
        width: 300px;
    }

    &.dialog-size-medium {
        width: 500px;
    }

    &.dialog-size-large {
        width: 800px;
    }
}

@keyframes dialogFadeIn {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 10px;
    border-bottom: 1px solid #e8e8e8;
}

.dialog-title {
    font-size: 18px;
    font-weight: 500;
    color: #333;
    line-height: 1;
}

.dialog-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f5f5f5;
    }

    .close-icon {
        font-size: 20px;
        color: #999;
        line-height: 1;
    }
}

.dialog-body {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px 20px;
    border-top: 1px solid #e8e8e8;
    gap: 12px;
}

.dialog-button {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;

    &:focus {
        outline: none;
    }

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.dialog-button-cancel {
    background-color: #fff;
    border-color: #d9d9d9;
    color: #333;

    &:hover {
        background-color: #f5f5f5;
        border-color: #c0c0c0;
    }
}

.dialog-button-confirm {
    background-color: #1890ff;
    border-color: #1890ff;
    color: #fff;

    &:hover {
        background-color: #40a9ff;
        border-color: #40a9ff;
    }

    &[disabled] {
        background-color: #f5f5f5;
        border-color: #d9d9d9;
        color: #999;
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .dialog-container {
        width: 90% !important;
        margin: 0 5%;
    }
}
</style>
