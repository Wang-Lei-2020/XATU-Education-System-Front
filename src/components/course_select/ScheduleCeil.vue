<template>
  <div class="schedule-ceil">
    <div class="course-num">{{course.courseNum}} [{{course.courseIndex}}]</div>
    <div class="course-name">{{course.name}} - {{course.teacher}}</div>
    <div class="course-location">{{course.location}}</div>
    <div class="course-conflicting" v-if="course.isConflicting">冲突课程！</div>
  </div>
</template>

<script>
export default {
  props: {
    course: Object
  }
}
</script>

<style scoped>
.course-conflicting {
    color: #ff0000;
    font-weight: 800;
}
</style>