/* eslint-disable */
function Academics() {
  return import(/* webpackChunkName: "Academics" */ '@/routes/Academics.vue')
}
function CensusGlSubgroup() {
  return import(
    /* webpackChunkName: "CensusGlSubgroup" */ '@/routes/CensusGlSubgroup.vue'
  )
}
function Climate() {
  return import(/* webpackChunkName: "Climate" */ '@/routes/Climate.vue')
}
function EquityReport() {
  return import(
    /* webpackChunkName: "EquityReport" */ '@/routes/EquityReport.vue'
  )
}
function Home() {
  return import(/* webpackChunkName: "Home" */ '@/routes/Home.vue')
}
function StudentSuccessIndicator() {
  return import(
    /* webpackChunkName: "StudentSuccessIndicator" */ '@/routes/StudentSuccessIndicator.vue'
  )
}
function academics_grade_level_readiness_ByClassroom_GLR() {
  return import(
    /* webpackChunkName: "academics-grade-level-readiness-ByClassroom.GLR" */ '@/routes/academics/grade-level-readiness/ByClassroom.GLR.vue'
  )
}
function academics_grade_level_readiness_ByGradeLevelAndSubgroup_GLR() {
  return import(
    /* webpackChunkName: "academics-grade-level-readiness-ByGradeLevelAndSubgroup.GLR" */ '@/routes/academics/grade-level-readiness/ByGradeLevelAndSubgroup.GLR.vue'
  )
}
function academics_grade_level_readiness_Overview_GLR() {
  return import(
    /* webpackChunkName: "academics-grade-level-readiness-Overview.GLR" */ '@/routes/academics/grade-level-readiness/Overview.GLR.vue'
  )
}
function academics_student_population_census_ByGradeLevelAndSubgroup_SPC() {
  return import(
    /* webpackChunkName: "academics-student-population-census-ByGradeLevelAndSubgroup.SPC" */ '@/routes/academics/student-population-census/ByGradeLevelAndSubgroup.SPC.vue'
  )
}

export default [
  {
    name: 'Academics',
    path: '/Academics',
    component: Academics,
  },
  {
    name: 'CensusGlSubgroup',
    path: '/CensusGlSubgroup',
    component: CensusGlSubgroup,
  },
  {
    name: 'Climate',
    path: '/Climate',
    component: Climate,
  },
  {
    name: 'EquityReport',
    path: '/EquityReport',
    component: EquityReport,
  },
  {
    name: 'Home',
    path: '/Home',
    component: Home,
  },
  {
    name: 'StudentSuccessIndicator',
    path: '/StudentSuccessIndicator',
    component: StudentSuccessIndicator,
  },
  {
    name: 'test',
    path: '/academics/grade-level-readiness/ByClassroom.GLR',
    component: academics_grade_level_readiness_ByClassroom_GLR,
    redirect: '/test-this-too-fooly',
  },
  {
    name: 'academics-grade-level-readiness-ByGradeLevelAndSubgroup.GLR',
    path: '/academics/grade-level-readiness/ByGradeLevelAndSubgroup.GLR',
    component: academics_grade_level_readiness_ByGradeLevelAndSubgroup_GLR,
  },
  {
    name: 'academics-grade-level-readiness-Overview.GLR',
    path: '/academics/grade-level-readiness/Overview.GLR',
    component: academics_grade_level_readiness_Overview_GLR,
  },
  {
    name: 'academics-student-population-census-ByGradeLevelAndSubgroup.SPC',
    path: '/academics/student-population-census/ByGradeLevelAndSubgroup.SPC',
    component: academics_student_population_census_ByGradeLevelAndSubgroup_SPC,
  },
]
