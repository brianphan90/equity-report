/* eslint-disable */
function index() {
  return import(/* webpackChunkName: "index" */ '@/routes/index.vue')
}
function index_academics() {
  return import(
    /* webpackChunkName: "index-academics" */ '@/routes/index/academics.vue'
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
function index_climate_and_engagement() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement" */ '@/routes/index/climate-and-engagement.vue'
  )
}
function index_climate_and_engagement_discipline() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-discipline" */ '@/routes/index/climate-and-engagement/discipline.vue'
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
function index_climate_and_engagement_staff_results() {
  return import(
    /* webpackChunkName: "index-climate-and-engagement-staff-results" */ '@/routes/index/climate-and-engagement/staff/results.vue'
  )
}
function login() {
  return import(/* webpackChunkName: "login" */ '@/routes/login.vue')
}

export default [
  {
    name: 'main',
    path: '/',
    component: index,
    redirect: 'academics',
    children: [
      {
        name: 'academics',
        path: '/academics',
        component: index_academics,
        meta: {
          navOptions: {
            title: 'Academics',
          },
        },
        redirect: '/academics/grade-level-readiness/glr-by-classroom',
        children: [
          {
            name: 'academics-caaspp',
            path: 'caaspp',
            component: index_academics_caaspp,
            meta: {
              navOptions: {
                title: 'CAASPP',
                order: 3,
              },
            },
            redirect: '/academics/caaspp/caaspp-by-classroom',
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
            name: 'academics-elpac',
            path: 'elpac',
            component: index_academics_elpac,
            meta: {
              navOptions: {
                title: 'ELPAC',
                order: 4,
              },
            },
            redirect: '/academics/elpac/elpac-by-classroom',
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
            path: 'grade-level-readiness',
            component: index_academics_grade_level_readiness,
            meta: {
              navOptions: {
                title: 'Grade Level Readiness',
                order: 2,
              },
            },
            redirect: '/academics/grade-level-readiness/glr-by-classroom',
            children: [
              {
                name: 'academics-grade-level-readiness-glr-by-classroom',
                path: 'glr-by-classroom',
                component: index_academics_grade_level_readiness_glr_by_classroom,
                meta: {
                  topbarTitle: 'Academic Performance Equity Report',
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
            path: 'student-population-census',
            component: index_academics_student_population_census,
            meta: {
              navOptions: {
                title: 'Student Population Census',
                order: 1,
              },
            },
            redirect:
              '/academics/student-population-census/spc-by-grade-level-and-subgroup',
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
        ],
      },
      {
        name: 'climate-and-engagement',
        path: '/climate-and-engagement',
        component: index_climate_and_engagement,
        meta: {
          navOptions: {
            title: 'Climate and Engagement',
          },
        },
        redirect:
          '/climate-and-engagement/discipline/behavior-incidents-overview',
        children: [
          {
            name: 'climate-and-engagement-discipline',
            path: 'discipline',
            component: index_climate_and_engagement_discipline,
            meta: {
              navOptions: {
                title: 'Discipline',
                order: 1,
              },
            },
            redirect:
              '/climate-and-engagement/discipline/behavior-incidents-disaggregated',
            children: [
              {
                name:
                  'climate-and-engagement-discipline-behavior-incidents-disaggregated',
                path: 'behavior-incidents-disaggregated',
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
                name:
                  'climate-and-engagement-discipline-behavior-incidents-overview',
                path: 'behavior-incidents-overview',
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
            name: 'climate-and-engagement-school-survey',
            path: 'school-survey',
            component: index_climate_and_engagement_school_survey,
            meta: {
              navOptions: {
                title: 'School Survey',
                order: 3,
              },
            },
            redirect: '/climate-and-engagement/school-survey/results',
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
            path: 'staff',
            component: index_climate_and_engagement_staff,
            meta: {
              navOptions: {
                title: 'Staff',
                order: 2,
              },
            },
            redirect:
              '/climate-and-engagement/staff/certificated-attendance-disaggregated',
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
                name:
                  'climate-and-engagement-staff-classified-attendance-overview',
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
              {
                name: 'climate-and-engagement-staff-results',
                path: 'results',
                component: index_climate_and_engagement_staff_results,
                meta: {
                  topbarTitle: 'S',
                  navOptions: {
                    title: 'By Classroom',
                    icon: 'whatever',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: login,
  },
]
