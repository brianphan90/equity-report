/* eslint-disable */
function index() {
  return import(/* webpackChunkName: "index" */ '@/routes/index.vue')
}
function index_climate_and_engagement_climate_and_engagement() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-climate-and-engagement" */ '@/routes/index/climate-and-engagement/climate-and-engagement.vue'
  )
}
function index_academics_academics() {
  return import(
    /* webpackChunkName: "index-academics-academics" */ '@/routes/index/academics/academics.vue'
  )
}
function index_academics_elpac() {
  return import(
    /* webpackChunkName: "index-academics-elpac" */ '@/routes/index/academics/elpac.vue'
  )
}
function index_academics_elpac_elpac_by_classroom() {
  return import(
    /* webpackChunkName: "index-academics-elpac-elpac-by-classroom" */ '@/routes/index/academics/elpac/elpac-by-classroom.vue'
  )
}
function index_academics_elpac_elpac_by_grade_level_and_subgroup() {
  return import(
    /* webpackChunkName: "index-academics-elpac-elpac-by-grade-level-and-subgroup" */ '@/routes/index/academics/elpac/elpac-by-grade-level-and-subgroup.vue'
  )
}
function index_academics_grade_level_readiness() {
  return import(
    /* webpackChunkName: "index-academics-grade-level-readiness" */ '@/routes/index/academics/grade-level-readiness.vue'
  )
}
function index_academics_grade_level_readiness_glr_by_classroom() {
  return import(
    /* webpackChunkName: "index-academics-grade-level-readiness-glr-by-classroom" */ '@/routes/index/academics/grade-level-readiness/glr-by-classroom.vue'
  )
}
function index_academics_grade_level_readiness_glr_by_grade_level_and_subgroup() {
  return import(
    /* webpackChunkName: "index-academics-grade-level-readiness-glr-by-grade-level-and-subgroup" */ '@/routes/index/academics/grade-level-readiness/glr-by-grade-level-and-subgroup.vue'
  )
}
function index_academics_grade_level_readiness_glr_overview() {
  return import(
    /* webpackChunkName: "index-academics-grade-level-readiness-glr-overview" */ '@/routes/index/academics/grade-level-readiness/glr-overview.vue'
  )
}
function index_academics_student_population_census() {
  return import(
    /* webpackChunkName: "index-academics-student-population-census" */ '@/routes/index/academics/student-population-census.vue'
  )
}
function index_academics_student_population_census_spc_by_grade_level_and_subgroup() {
  return import(
    /* webpackChunkName: "index-academics-student-population-census-spc-by-grade-level-and-subgroup" */ '@/routes/index/academics/student-population-census/spc-by-grade-level-and-subgroup.vue'
  )
}
function index_academics_caaspp() {
  return import(
    /* webpackChunkName: "index-academics-caaspp" */ '@/routes/index/academics/caaspp.vue'
  )
}
function index_academics_caaspp_caaspp_by_classroom() {
  return import(
    /* webpackChunkName: "index-academics-caaspp-caaspp-by-classroom" */ '@/routes/index/academics/caaspp/caaspp-by-classroom.vue'
  )
}
function index_academics_caaspp_caaspp_by_grade_level_and_subgroup() {
  return import(
    /* webpackChunkName: "index-academics-caaspp-caaspp-by-grade-level-and-subgroup" */ '@/routes/index/academics/caaspp/caaspp-by-grade-level-and-subgroup.vue'
  )
}
function index_climate_and_engagement_displine() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-displine" */ '@/routes/index/climate-and-engagement/displine.vue'
  )
}
function index_climate_and_engagement_school_survey() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-school-survey" */ '@/routes/index/climate-and-engagement/school-survey.vue'
  )
}
function index_climate_and_engagement_school_survey_results() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-school-survey-results" */ '@/routes/index/climate-and-engagement/school-survey/results.vue'
  )
}
function index_climate_and_engagement_staff() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-staff" */ '@/routes/index/climate-and-engagement/staff.vue'
  )
}
function index_climate_and_engagement_staff_certificated_attendance_disaggregated() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-staff-certificated-attendance-disaggregated" */ '@/routes/index/climate-and-engagement/staff/certificated-attendance-disaggregated.vue'
  )
}
function index_climate_and_engagement_staff_certificated_attendance_overview() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-staff-certificated-attendance-overview" */ '@/routes/index/climate-and-engagement/staff/certificated-attendance-overview.vue'
  )
}
function index_climate_and_engagement_staff_classified_attendance_disaggregated() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-staff-classified-attendance-disaggregated" */ '@/routes/index/climate-and-engagement/staff/classified-attendance-disaggregated.vue'
  )
}
function index_climate_and_engagement_staff_classified_attendance_overview() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-staff-classified-attendance-overview" */ '@/routes/index/climate-and-engagement/staff/classified-attendance-overview.vue'
  )
}
function index_climate_and_engagement_discipline_behavior_incidents_disaggregated() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-discipline-behavior-incidents-disaggregated" */ '@/routes/index/climate-and-engagement/discipline/behavior-incidents-disaggregated.vue'
  )
}
function index_climate_and_engagement_discipline_behavior_incidents_overview() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-discipline-behavior-incidents-overview" */ '@/routes/index/climate-and-engagement/discipline/behavior-incidents-overview.vue'
  )
}
function EquityReport() {
  return import(
    /* webpackChunkName: "EquityReport" */ '@/routes/EquityReport.vue'
  )
}

export default [
  {
    name: 'main',
    path: '/',
    component: index,
    redirect: 'academics',
    children: [
      {
        name: 'climate-and-engagement-climate-and-engagement',
        path: '/climate-and-engagement/climate-and-engagement',
        component: index_climate_and_engagement_climate_and_engagement,
        redirect:
          '/climate-and-engagement/discipline/behavior-incidents-overview',
      },
      {
        name: 'academics-academics',
        path: '/academics/academics',
        component: index_academics_academics,
        redirect: '/academics/grade-level-readiness/glr-by-classroom',
      },
      {
        name: 'academics-elpac',
        path: '/academics/elpac',
        component: index_academics_elpac,
        children: [
          {
            name: 'academics-elpac-elpac-by-classroom',
            path: 'elpac-by-classroom',
            component: index_academics_elpac_elpac_by_classroom,
            meta: {
              topbarTitle: 'ELPAC By Classroom',
              navOptions: {
                title: 'By Classroom',
                icon: 'whatever',
              },
            },
          },
          {
            name: 'academics-elpac-elpac-by-grade-level-and-subgroup',
            path: 'elpac-by-grade-level-and-subgroup',
            component: index_academics_elpac_elpac_by_grade_level_and_subgroup,
            meta: {
              topbarTitle: 'ELPAC By Grade Level and Subgroup',
              navOptions: {
                title: 'By Grade Level and Subgroup',
                icon: 'whatever',
              },
            },
          },
        ],
      },
      {
        name: 'academics-grade-level-readiness',
        path: '/academics/grade-level-readiness',
        component: index_academics_grade_level_readiness,
        children: [
          {
            name: 'academics-grade-level-readiness-glr-by-classroom',
            path: 'glr-by-classroom',
            component: index_academics_grade_level_readiness_glr_by_classroom,
            meta: {
              topbarTitle: 'GLR By Classroom',
              navOptions: {
                title: 'By Classroom',
                icon: 'whatever',
              },
            },
          },
          {
            name:
              'academics-grade-level-readiness-glr-by-grade-level-and-subgroup',
            path: 'glr-by-grade-level-and-subgroup',
            component: index_academics_grade_level_readiness_glr_by_grade_level_and_subgroup,
            meta: {
              topbarTitle: 'GLR By Grade Level and Subgroup',
              navOptions: {
                title: 'By Grade Level and Subgroup',
                icon: 'whatever',
              },
            },
          },
          {
            name: 'academics-grade-level-readiness-glr-overview',
            path: 'glr-overview',
            component: index_academics_grade_level_readiness_glr_overview,
            meta: {
              topbarTitle: 'GLR Overview',
              navOptions: {
                title: 'Overview',
                icon: 'whatever',
              },
            },
          },
        ],
      },
      {
        name: 'academics-student-population-census',
        path: '/academics/student-population-census',
        component: index_academics_student_population_census,
        children: [
          {
            name:
              'academics-student-population-census-spc-by-grade-level-and-subgroup',
            path: 'spc-by-grade-level-and-subgroup',
            component: index_academics_student_population_census_spc_by_grade_level_and_subgroup,
            meta: {
              topbarTitle: 'SPC by Grade Level and Subgroup',
              navOptions: {
                title: 'By Grade Level and Subgroup',
                icon: 'whatever',
              },
            },
          },
        ],
      },
      {
        name: 'academics-caaspp',
        path: '/academics/caaspp',
        component: index_academics_caaspp,
        children: [
          {
            name: 'academics-caaspp-caaspp-by-classroom',
            path: 'caaspp-by-classroom',
            component: index_academics_caaspp_caaspp_by_classroom,
            meta: {
              topbarTitle: 'CAASPP By Classroom',
              navOptions: {
                title: 'By Classroom',
                icon: 'whatever',
              },
            },
          },
          {
            name: 'academics-caaspp-caaspp-by-grade-level-and-subgroup',
            path: 'caaspp-by-grade-level-and-subgroup',
            component: index_academics_caaspp_caaspp_by_grade_level_and_subgroup,
            meta: {
              topbarTitle: 'CAASPP By Grade Level and Subgroup',
              navOptions: {
                title: 'By Grade Level and Subgroup',
                icon: 'whatever',
              },
            },
          },
        ],
      },
      {
        name: 'climate-and-engagement-displine',
        path: '/climate-and-engagement/displine',
        component: index_climate_and_engagement_displine,
      },
      {
        name: 'climate-and-engagement-school-survey',
        path: '/climate-and-engagement/school-survey',
        component: index_climate_and_engagement_school_survey,
        children: [
          {
            name: 'climate-and-engagement-school-survey-results',
            path: 'results',
            component: index_climate_and_engagement_school_survey_results,
            meta: {
              topbarTitle: 'School Survey Results',
              navOptions: {
                title: 'Results',
                icon: 'whatever',
              },
            },
          },
        ],
      },
      {
        name: 'climate-and-engagement-staff',
        path: '/climate-and-engagement/staff',
        component: index_climate_and_engagement_staff,
        children: [
          {
            name:
              'climate-and-engagement-staff-certificated-attendance-disaggregated',
            path: 'certificated-attendance-disaggregated',
            component: index_climate_and_engagement_staff_certificated_attendance_disaggregated,
            meta: {
              topbarTitle: 'Staff Certificated Attendance Disaggregated',
              navOptions: {
                title: 'Certificated Attendance Disaggregated',
                icon: 'whatever',
              },
            },
          },
          {
            name:
              'climate-and-engagement-staff-certificated-attendance-overview',
            path: 'certificated-attendance-overview',
            component: index_climate_and_engagement_staff_certificated_attendance_overview,
            meta: {
              topbarTitle: 'Staff Certificated Attendance Overview',
              navOptions: {
                title: 'Certificated Attendance Overview',
                icon: 'whatever',
              },
            },
          },
          {
            name:
              'climate-and-engagement-staff-classified-attendance-disaggregated',
            path: 'classified-attendance-disaggregated',
            component: index_climate_and_engagement_staff_classified_attendance_disaggregated,
            meta: {
              topbarTitle: 'Staff Classified Attendance Disaggregated',
              navOptions: {
                title: 'Classified Attendance Disaggregated',
                icon: 'whatever',
              },
            },
          },
          {
            name: 'climate-and-engagement-staff-classified-attendance-overview',
            path: 'classified-attendance-overview',
            component: index_climate_and_engagement_staff_classified_attendance_overview,
            meta: {
              topbarTitle: 'Staff Classified Attendance Overview',
              navOptions: {
                title: 'Classified Attendance Overview',
                icon: 'whatever',
              },
            },
          },
        ],
      },
      {
        name:
          'climate-and-engagement-discipline-behavior-incidents-disaggregated',
        path:
          '/climate-and-engagement/discipline/behavior-incidents-disaggregated',
        component: index_climate_and_engagement_discipline_behavior_incidents_disaggregated,
        meta: {
          topbarTitle: 'Discipline Behavior Incidents Disaggregated',
          navOptions: {
            title: 'Behavior Incidents Disaggregated',
            icon: 'whatever',
          },
        },
      },
      {
        name: 'climate-and-engagement-discipline-behavior-incidents-overview',
        path: '/climate-and-engagement/discipline/behavior-incidents-overview',
        component: index_climate_and_engagement_discipline_behavior_incidents_overview,
        meta: {
          topbarTitle: 'Discipline Behavior Incidents Overview',
          navOptions: {
            title: 'Behavior Incidents Overview',
            icon: 'whatever',
          },
        },
      },
    ],
  },
  {
    name: 'EquityReport',
    path: '/EquityReport',
    component: EquityReport,
  },
]
