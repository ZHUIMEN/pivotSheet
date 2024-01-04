<template>
  <draggable
    v-model="list"
    chosenClass="custom-table-chosen"
    ghostClass="custom-table-ghost"
    handle=".mover"
    filter=".forbid"
    :forceFallback="true"
    item-key="index"
    @end="upDataColumn"
    :move="onMove"
  >
    <template #item="{ element, index }">
      <div
        :key="index"
        style="min-width: 200px; line-height: 28px"
        :class="element.fixed ? 'forbid' : ''"
      >
        <span class="mr-15 w-13 inline-block">
          <span class="mover custom-table-mover">
            <HolderOutlined />
          </span>
        </span>
        <Checkbox
          v-model:checked="element.selected"
          @change="upDataColumn"
          style="width: calc(100% - 30px)"
        >
          {{ element.label }}
        </Checkbox>
      </div>
    </template>
  </draggable>
</template>

<script setup>
import draggable from "vuedraggable"
import { computed, defineEmits } from "vue"
import { HolderOutlined } from "@ant-design/icons-vue"
import { Checkbox } from "ant-design-vue"

const props = defineProps({
  columnList: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(["update:columnList"])
const list = computed({
  get() {
    return props.columnList
  },
  set(e) {
    emit("update:columnList", e)
  },
})
const upDataColumn = () => {}
const onMove = () => {}
</script>

<style lang="less" scoped>
@import "./index.less";

:deep(.ant-checkbox + span) {
  color: #606266;
}
:deep(.ant-radio-group .ant-radio-group-outline span, span.ant-radio + *) {
  color: #606266;
}
</style>
