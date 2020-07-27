FORMAT: 1A
HOST: https://polls.apiblueprint.org/

# Equity Report

Data is hard.

## Authenticate [/authenticate]

### Get Token [GET]

After signing in using firebase, hit this route to obtain an MUSD auth token which will be used for all further authentication.

+ Response 200 (application/json)

        [
        ]

## Data [/data]

### Master Route [GET /data/{reportType}/{dataKey}{?year, identityId}]

This is the master route to get all different data displayed in the application. There are three mandatory url params: `year`, `report_type`, and `data_key`

+ Request
        
        + Params
            + reportType: `classified` (string) - Options: [classified, school, teacher]
            + dataKey: `spc-by-grade-level-and-subgroup` (string) - The key of the chart to be displayed
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)
        
        Look at the specific uses of the master route for respsonses

### Student Population Census [GET /data/spc-by-grade-level-and-subgroup]

+ Request

        + Params
            + year: `2019-2020`
            + report_type: `student`
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id

+ Response 200 (application/json)

        {
            "populationCount" : {
                "value" : 756,
                "label" : "2018-2019 Census Day Student Population Count",
                "color" : "#D8A556"
            },
            "charts" : [
                {
                    "title": "By Grade Level",
                    "legend" : {
                        "default" : {
                            "color" : "#D8A556"
                        }
                    },
                    "data" : [
                        {
                            "label" : "Grade K",
                            "value" : 128,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Grade 1",
                            "value" : 102,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Grade 2",
                            "value" : 120,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Grade 3",
                            "value" : 124,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Grade 4",
                            "value" : 137,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Grade 5",
                            "value" : 130,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Grade 6",
                            "value" : 108,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Grade 7",
                            "value" : 0,
                            "color" : "#D8A556"
                        }
                    ]
                },
                {
                    "title": "By Subgroup",
                    "legend" : {
                        "default" : {
                            "color" : "#D8A556"
                        }
                    },
                    "data" : [
                        {
                            "label" : "Socio-Economically Disadvantage",
                            "value" : 608,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "English Learner",
                            "value" : 385,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Foster Youth",
                            "value" : 275,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Homeless",
                            "value" : 64,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Students with Disabilities",
                            "value" : 93,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Hispanic",
                            "value" : 611,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "White",
                            "value" : 304,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Black",
                            "value" : 152,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Asian",
                            "value" : 304,
                            "color" : "#D8A556"
                        },
                        {
                            "label" : "Filipino",
                            "value" : 304,
                            "color" : "#D8A556"
                        }
                    ]
                }
            ]
        }
        
### Grade Level Readiness Overview [GET /data/glr-overview]

+ Request

        + Params
            + report_type: school
            + data_key: glr-overview
            
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "totalGlrScore" : 789,
            "legend" : [
                {
                    "label" : "English Language Arts",
                    "color" : "#86B5D0"
                },
                {
                    "label" : "Math",
                    "color" : "#6CAE8F"
                },
                {
                    "label" : "Climate and Engagement",
                    "color" : "#BE8674"
                },
                {
                    "label" : "Other",
                    "color" : "#D0BA49"
                },
            ],
            "charts" : {
                "overview" : {
                    "type" : "radial-bar-chart"
                    "title": "Average GLR Score",
                    "legend" : {
                        "sbacEla" : {
                            "label" : "SBAC ELA",
                            "color" : "#86B5D0"
                        },
                        "nweaEla" : {
                            "label" : "NWEA ELA",
                            "color" : "#86B5D0"
                        },
                        "elaGpa" : {
                            "label" : "ELA GPA",
                            "color" : "#86B5D0"
                        },
                        "sbacMath" : {
                            "label" : "SBAC Math",
                            "color" : "#6CAE8F"
                        },
                        "nweaMath" : {
                            "label" : "NWEA Math",
                            "color" : "#6CAE8F"
                        },
                        "mathGPA" : {
                            "label" : "Math GPA",
                            "color" : "#6CAE8F"
                        },
                        "attendance" : {
                            "label" : "Attendance",
                            "color" : "#BE8674"
                        },
                        "discipline" : {
                            "label" : "Discipline",
                            "color" : "#BE8674"
                        },
                        "scholastic" : {
                            "label" : "Scholastic",
                            "color" : "#D0BA49"
                        },
                        "other" : {
                            "label" : "Other",
                            "color" : "#D0BA49"
                        },
                    },
                    "data" : {
                        "sbacEla" : 80,
                        "nweaEla" : 50,
                        "elaGpa"  : 80,
                        "sbacMath" : 40,
                        "nweaMath" : 60,
                        "mathGPA" : 80,
                        "attendance" : 40,
                        "discipline" : 50,
                        "scholastic" : 80,
                        "other" : 0
                    }
                },
                "overall" : {
                    "title": "Overall GLR Results Percent of Students",
                    "legend" : {
                        "currentYear" : {
                            "label" : "Current Year",
                            "value" : 2019,
                            "color" : "#D8A556"
                        },
                        "priorYear" : {
                            "label" : "Current Year",
                            "value" : 2018,
                            "color" : "#757777"
                        }
                    },
                    "data" : [
                        {
                            "label" : "Far Below",
                            "value" : {
                                "currentYear" : 12,
                                "priorYear" : 28
                            }
                        },
                        {
                            "label" : "Below",
                            "value" : {
                                "currentYear" : 12,
                                "priorYear" : 28
                            }
                        },
                        {
                            "label" : "Close",
                            "value" : {
                                "currentYear" : 12,
                                "priorYear" : 28
                            }
                        },
                        {
                            "label" : "Ready",
                            "value" : {
                                "currentYear" : 12,
                                "priorYear" : 28
                            }
                        },
                        {
                            "label" : "Exceeding",
                            "value" : {
                                "currentYear" : 12,
                                "priorYear" : 28
                            }
                        },
                    ],
                },
                "collegeTracker" : {
                    "title" : "College Tracker",
                    "data"  : [
                        {
                            "label" : "CA Community (JC)",
                            "value" : 58,
                        },
                        {
                            "label" : "CA State University (CSU)",
                            "value" : 22,
                        },
                        {
                            "label" : "University of CA (UC)",
                            "value" : 20,
                        },
                    ]
                }
            },
        }
        
### Grade Level Readiness By Grade Level [GET /data/school/glr-by-grade-level-and-subgroup]

+ Request

        + Params
            + report_type: school
            + data_key: glr-by-grade-level-and-subgroup
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "totalGlrScore": 789,
            "charts": [
                {
                    "legend": {
                        "currentYear": {
                            "label": "Current Year",
                            "color": "#5C8484"
                        },
                        "priorYear": {
                            "label": "Prior Year",
                            "color": "#BDD7D5"
                        },
                        "difference": {
                            "label": "Difference",
                            "color": "#000000"
                        },
                        "solid": {
                            "label": "Solid (Current)",
                            "color": "#888888"
                        },
                        "faded": {
                            "label": "Faded (Prior)",
                            "color": "#BDBDBD"
                        },
                        "exceeding": {
                            "label": "Exceeding",
                            "color": "#557176"
                        },
                        "ready": {
                            "label": "Ready",
                            "color": "#64A399"
                        },
                        "close": {
                            "label": "Close",
                            "color": "#D0BA49"
                        },
                        "below": {
                            "label": "Below",
                            "color": "#D8A556"
                        },
                        "farBelow": {
                            "label": "Far Below",
                            "color": "#9B3E3A"
                        }
                    },
                    "data": {
                        "glr": [
                            {
                                "label": "K",
                                "data": {
                                    "exceeding": 28.599999999999998,
                                    "ready": 9,
                                    "close": 33.92,
                                    "below": 15.08,
                                    "farBelow": 13.4
                                }
                            },
                            {
                                "label": "1",
                                "data": {
                                    "exceeding": 29.79,
                                    "ready": 9.21,
                                    "close": 29.22,
                                    "below": 12,
                                    "farBelow": 19.78
                                }
                            },
                            {
                                "label": "2",
                                "data": {
                                    "exceeding": 26.919999999999998,
                                    "ready": 11.04,
                                    "close": 35,
                                    "below": 9.959999999999999,
                                    "farBelow": 17.080000000000002
                                }
                            },
                            {
                                "label": "3",
                                "data": {
                                    "exceeding": 29.68,
                                    "ready": 10.66,
                                    "close": 33.75,
                                    "below": 12.319999999999999,
                                    "farBelow": 13.59
                                }
                            },
                            {
                                "label": "4",
                                "data": {
                                    "exceeding": 29.32,
                                    "ready": 11.76,
                                    "close": 31.24,
                                    "below": 9.920000000000002,
                                    "farBelow": 17.759999999999998
                                }
                            },
                            {
                                "label": "5",
                                "data": {
                                    "exceeding": 32.11,
                                    "ready": 9,
                                    "close": 35,
                                    "below": 12.200000000000001,
                                    "farBelow": 11.69
                                }
                            },
                            {
                                "label": "6",
                                "data": {
                                    "exceeding": 30.549999999999997,
                                    "ready": 11.46,
                                    "close": 29.19,
                                    "below": 16.689999999999998,
                                    "farBelow": 12.11
                                }
                            },
                            {
                                "label": "7",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 8.73,
                                    "close": 36.57,
                                    "below": 10.43,
                                    "farBelow": 14.27
                                }
                            },
                            {
                                "label": "8",
                                "data": {
                                    "exceeding": 30.259999999999998,
                                    "ready": 8.21,
                                    "close": 35,
                                    "below": 13.83,
                                    "farBelow": 12.7
                                }
                            },
                            {
                                "label": "9",
                                "data": {
                                    "exceeding": 35.33,
                                    "ready": 9.02,
                                    "close": 28.79,
                                    "below": 12,
                                    "farBelow": 14.860000000000001
                                }
                            },
                            {
                                "label": "10",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 9.870000000000001,
                                    "close": 35,
                                    "below": 12,
                                    "farBelow": 13.129999999999999
                                }
                            },
                            {
                                "label": "11",
                                "data": {
                                    "exceeding": 25.209999999999997,
                                    "ready": 10.17,
                                    "close": 35,
                                    "below": 12,
                                    "farBelow": 17.619999999999997
                                }
                            },
                            {
                                "label": "12",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 10.76,
                                    "close": 32.36,
                                    "below": 12,
                                    "farBelow": 14.88
                                }
                            }
                        ],
                        "metOrExceeding": {
                            "currentYear": [
                                {
                                    "label": "K",
                                    "value": 37.599999999999994
                                },
                                {
                                    "label": "1",
                                    "value": 39
                                },
                                {
                                    "label": "2",
                                    "value": 37.959999999999994
                                },
                                {
                                    "label": "3",
                                    "value": 40.34
                                },
                                {
                                    "label": "4",
                                    "value": 41.08
                                },
                                {
                                    "label": "5",
                                    "value": 41.11
                                },
                                {
                                    "label": "6",
                                    "value": 42.01
                                },
                                {
                                    "label": "7",
                                    "value": 38.730000000000004
                                },
                                {
                                    "label": "8",
                                    "value": 38.47
                                },
                                {
                                    "label": "9",
                                    "value": 44.349999999999994
                                },
                                {
                                    "label": "10",
                                    "value": 39.870000000000005
                                },
                                {
                                    "label": "11",
                                    "value": 35.379999999999995
                                },
                                {
                                    "label": "12",
                                    "value": 40.76
                                }
                            ],
                            "priorYear": [
                                {
                                    "label": "K",
                                    "value": 39
                                },
                                {
                                    "label": "1",
                                    "value": 38
                                },
                                {
                                    "label": "2",
                                    "value": 39
                                },
                                {
                                    "label": "3",
                                    "value": 36
                                },
                                {
                                    "label": "4",
                                    "value": 39
                                },
                                {
                                    "label": "5",
                                    "value": 37
                                },
                                {
                                    "label": "6",
                                    "value": 38
                                },
                                {
                                    "label": "7",
                                    "value": 39
                                },
                                {
                                    "label": "8",
                                    "value": 39
                                },
                                {
                                    "label": "9",
                                    "value": 42
                                },
                                {
                                    "label": "10",
                                    "value": 40
                                },
                                {
                                    "label": "11",
                                    "value": 39
                                },
                                {
                                    "label": "12",
                                    "value": 41
                                }
                            ]
                        }
                    }
                },
                {
                    "legend": {
                        "subgroups": {
                            "sed": {
                                "label": "SED",
                                "value": "Socio-economically"
                            },
                            "el": {
                                "label": "EL",
                                "value": "English-Learner"
                            },
                            "fy": {
                                "label": "FY",
                                "value": "Foster Youth"
                            },
                            "hl": {
                                "label": "HL",
                                "value": "Homeless"
                            },
                            "swd": {
                                "label": "SWD",
                                "value": "Students with disabilities"
                            },
                            "hi": {
                                "label": "HL",
                                "value": "Hispanic"
                            },
                            "wh": {
                                "label": "WH",
                                "value": "White"
                            },
                            "bl": {
                                "label": "BL",
                                "value": "Black"
                            },
                            "as": {
                                "label": "AS",
                                "value": "Asian"
                            },
                            "fi": {
                                "label": "FI",
                                "value": "Filipino"
                            },
                            "glr": {
                                "exceeding": {
                                    "label": "Exceeding",
                                    "color": "#557176"
                                },
                                "ready": {
                                    "label": "Ready",
                                    "color": "#64A399"
                                },
                                "below": {
                                    "label": "Below",
                                    "color": "#D8A556"
                                },
                                "farBelow": {
                                    "label": "Far Below",
                                    "color": "#9B3E3A"
                                }
                            }
                        }
                    },
                    "data": {
                        "glr": [
                            {
                                "label": "SED",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 10.39,
                                    "close": 33.76,
                                    "below": 11.85,
                                    "farBelow": 14
                                }
                            },
                            {
                                "label": "EL",
                                "data": {
                                    "exceeding": 27.99,
                                    "ready": 9.73,
                                    "close": 33.74,
                                    "below": 13.59,
                                    "farBelow": 14.95
                                }
                            },
                            {
                                "label": "FY",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 9,
                                    "close": 35,
                                    "below": 10.96,
                                    "farBelow": 15.04
                                }
                            },
                            {
                                "label": "HL",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 10.02,
                                    "close": 33.98,
                                    "below": 10.14,
                                    "farBelow": 15.86
                                }
                            },
                            {
                                "label": "SWD",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 10.12,
                                    "close": 35,
                                    "below": 10.79,
                                    "farBelow": 14.09
                                }
                            },
                            {
                                "label": "HL",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 9,
                                    "close": 33.69,
                                    "below": 14.46,
                                    "farBelow": 12.850000000000001
                                }
                            },
                            {
                                "label": "WH",
                                "data": {
                                    "exceeding": 24.819999999999997,
                                    "ready": 10.41,
                                    "close": 37.39,
                                    "below": 13.580000000000002,
                                    "farBelow": 13.799999999999999
                                }
                            },
                            {
                                "label": "BL",
                                "data": {
                                    "exceeding": 27.37,
                                    "ready": 9.93,
                                    "close": 30.71,
                                    "below": 13.7,
                                    "farBelow": 18.29
                                }
                            },
                            {
                                "label": "AS",
                                "data": {
                                    "exceeding": 30,
                                    "ready": 9,
                                    "close": 35.66,
                                    "below": 12.01,
                                    "farBelow": 13.33
                                }
                            },
                            {
                                "label": "FI",
                                "data": {
                                    "exceeding": 30.16,
                                    "ready": 12.58,
                                    "close": 31.26,
                                    "below": 12,
                                    "farBelow": 14
                                }
                            }
                        ],
                        "metOrExceeding": {
                            "currentYear": [
                                {
                                    "label": "SED",
                                    "value": 40.39
                                },
                                {
                                    "label": "EL",
                                    "value": 37.72
                                },
                                {
                                    "label": "FY",
                                    "value": 39
                                },
                                {
                                    "label": "HL",
                                    "value": 40.019999999999996
                                },
                                {
                                    "label": "SWD",
                                    "value": 40.12
                                },
                                {
                                    "label": "HL",
                                    "value": 39
                                },
                                {
                                    "label": "WH",
                                    "value": 35.23
                                },
                                {
                                    "label": "BL",
                                    "value": 37.3
                                },
                                {
                                    "label": "AS",
                                    "value": 39
                                },
                                {
                                    "label": "FI",
                                    "value": 42.74
                                }
                            ],
                            "priorYear": [
                                {
                                    "label": "SED",
                                    "value": 43
                                },
                                {
                                    "label": "EL",
                                    "value": 39
                                },
                                {
                                    "label": "FY",
                                    "value": 37
                                },
                                {
                                    "label": "HL",
                                    "value": 39
                                },
                                {
                                    "label": "SWD",
                                    "value": 40
                                },
                                {
                                    "label": "HL",
                                    "value": 42
                                },
                                {
                                    "label": "WH",
                                    "value": 36
                                },
                                {
                                    "label": "BL",
                                    "value": 36
                                },
                                {
                                    "label": "AS",
                                    "value": 41
                                },
                                {
                                    "label": "FI",
                                    "value": 41
                                }
                            ]
                        }
                    }
                }
            ]
        }

### Grade Level Readiness By Classroom [GET /data/2019-2020/student/glr-by-classroom]

+ Request

        + Params
            + year: `2019-2020` 
            + report_type: student
            + data_key: glr-by-classroom
            
+ Response 200 (application/json)

        {
          "legend" : {
            "exceeding" : {
              "label" : "Exceeding",
              "color" : "#557176"
            },
            "ready" : {
              "label" : "Ready",
              "color" : "#64A399"
            },
            "close" : {
              "label" : "Close",
              "color" : "#D0BA49"
            },
            "below" : {
              "label" : "Below",
              "color" : "#D8A556"
            },
            "farBelow" : {
              "label" : "Far Below",
              "color" : "#9B3E3A"
            },
            "current" : {
              "label" : "Solid (Current)",
              "color" : "#888888"
            },
            "prior" : {
              "label" : "Faded (Prior)",
              "color" : "#BDBDBD"
            },
            "positive" : {
              "label" : "Positive Change",
              "color" : "#688A8D",
              "shape" : "triangle-up"
            },
            "negative" : {
              "label" : "Negative Change",
              "color" : "#BF8574",
              "shape" : "triangle-down"
            }
          },
          "charts" : [
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceeding" : 30,
                  "ready"     : 9,
                  "close"     : 35,
                  "below"     : 12,
                  "farBelow"  : 14
                },
                "meta" : {
                  "change"     : "negative",
                  "scoreCount" : 30
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceeding" : 30,
                  "ready"     : 9,
                  "close"     : 35,
                  "below"     : 12,
                  "farBelow"  : 14
                },
                "meta" : {
                  "change"     : "negative",
                  "scoreCount" : 30
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceeding" : 30,
                  "ready"     : 9,
                  "close"     : 35,
                  "below"     : 12,
                  "farBelow"  : 14
                },
                "meta" : {
                  "change"     : "negative",
                  "scoreCount" : 30
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceeding" : 30,
                  "ready"     : 9,
                  "close"     : 35,
                  "below"     : 12,
                  "farBelow"  : 14
                },
                "meta" : {
                  "change"     : "negative",
                  "scoreCount" : 30
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceeding" : 30,
                  "ready"     : 9,
                  "close"     : 35,
                  "below"     : 12,
                  "farBelow"  : 14
                },
                "meta" : {
                  "change"     : "negative",
                  "scoreCount" : 30
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceeding" : 30,
                  "ready"     : 9,
                  "close"     : 35,
                  "below"     : 12,
                  "farBelow"  : 14
                },
                "meta" : {
                  "change"     : "negative",
                  "scoreCount" : 30
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceeding" : 30,
                  "ready"     : 9,
                  "close"     : 35,
                  "below"     : 12,
                  "farBelow"  : 14
                },
                "meta" : {
                  "change"     : "negative",
                  "scoreCount" : 30
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceeding" : 30,
                  "ready"     : 9,
                  "close"     : 35,
                  "below"     : 12,
                  "farBelow"  : 14
                },
                "meta" : {
                  "change"     : "negative",
                  "scoreCount" : 30
                }
              }
            }
          ]
        }
        
### CAASPP By Grade Level and Subgroup [GET /data/school/caaspp-by-grade-level-and-subgroup]

+ Request

        + Params
            + report_type: school
            + data_key: caaspp-by-grade-level-and-subgroup
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "legend": {
                "overUnderChart": {
                    "positive": {
                        "currentYear": {
                            "color": "#557176"
                        },
                        "priorYear": {
                            "color": "#94AEB4"
                        }
                    },
                    "negative": {
                        "currentYear": {
                            "color": "#BE8674"
                        },
                        "priorYear": {
                            "color": "#D7B6AA"
                        }
                    }
                },
                "pyramidOverUnderChart": {
                    "positive": {
                        "color": "#557176",
                        "label": "Met or Exceeded"
                    },
                    "negative": {
                        "color": "#BE8674",
                        "label": "Not Met or Nearly Met"
                    }
                }
            },
            "charts": [
                {
                    "title": "ELA",
                    "byGradeLevel": {
                        "type": "overUnderChart",
                        "data": [
                            {
                                "label": 3,
                                "positive": {
                                    "currentYear": 98,
                                    "priorYear": 99
                                },
                                "negative": {
                                    "currentYear": 2,
                                    "priorYear": 1
                                }
                            },
                            {
                                "label": 4,
                                "positive": {
                                    "currentYear": 95,
                                    "priorYear": 90
                                },
                                "negative": {
                                    "currentYear": 5,
                                    "priorYear": 10
                                }
                            },
                            {
                                "label": 5,
                                "positive": {
                                    "currentYear": 78,
                                    "priorYear": 79
                                },
                                "negative": {
                                    "currentYear": 22,
                                    "priorYear": 21
                                }
                            },
                            {
                                "label": 6,
                                "positive": {
                                    "currentYear": 50,
                                    "priorYear": 55
                                },
                                "negative": {
                                    "currentYear": 50,
                                    "priorYear": 45
                                }
                            },
                            {
                                "label": 7,
                                "positive": {
                                    "currentYear": 83,
                                    "priorYear": 78
                                },
                                "negative": {
                                    "currentYear": 17,
                                    "priorYear": 22
                                }
                            },
                            {
                                "label": 8,
                                "positive": {
                                    "currentYear": 79,
                                    "priorYear": 76
                                },
                                "negative": {
                                    "currentYear": 21,
                                    "priorYear": 24
                                }
                            },
                            {
                                "label": 9,
                                "positive": {
                                    "currentYear": 83,
                                    "priorYear": 77
                                },
                                "negative": {
                                    "currentYear": 17,
                                    "priorYear": 23
                                }
                            },
                            {
                                "label": 10,
                                "positive": {
                                    "currentYear": 90,
                                    "priorYear": 99
                                },
                                "negative": {
                                    "currentYear": 10,
                                    "priorYear": 1
                                }
                            },
                            {
                                "label": 11,
                                "positive": {
                                    "currentYear": 90,
                                    "priorYear": 82
                                },
                                "negative": {
                                    "currentYear": 10,
                                    "priorYear": 18
                                }
                            }
                        ]
                    },
                    "bySubgroup": {
                        "type": "overUnderChart",
                        "data": [
                            {
                                "label": "SED",
                                "positive": {
                                    "currentYear": 80,
                                    "priorYear": 78
                                },
                                "negative": {
                                    "currentYear": 20,
                                    "priorYear": 22
                                }
                            },
                            {
                                "label": "EL",
                                "positive": {
                                    "currentYear": 83,
                                    "priorYear": 82
                                },
                                "negative": {
                                    "currentYear": 17,
                                    "priorYear": 18
                                }
                            },
                            {
                                "label": "FY",
                                "positive": {
                                    "currentYear": 67,
                                    "priorYear": 64
                                },
                                "negative": {
                                    "currentYear": 33,
                                    "priorYear": 36
                                }
                            },
                            {
                                "label": "HL",
                                "positive": {
                                    "currentYear": 53,
                                    "priorYear": 50
                                },
                                "negative": {
                                    "currentYear": 47,
                                    "priorYear": 50
                                }
                            },
                            {
                                "label": "SWD",
                                "positive": {
                                    "currentYear": 66,
                                    "priorYear": 61
                                },
                                "negative": {
                                    "currentYear": 34,
                                    "priorYear": 39
                                }
                            },
                            {
                                "label": "HL",
                                "positive": {
                                    "currentYear": 53,
                                    "priorYear": 54
                                },
                                "negative": {
                                    "currentYear": 47,
                                    "priorYear": 46
                                }
                            },
                            {
                                "label": "WH",
                                "positive": {
                                    "currentYear": 51,
                                    "priorYear": 47
                                },
                                "negative": {
                                    "currentYear": 49,
                                    "priorYear": 53
                                }
                            },
                            {
                                "label": "BL",
                                "positive": {
                                    "currentYear": 96,
                                    "priorYear": 93
                                },
                                "negative": {
                                    "currentYear": 4,
                                    "priorYear": 7
                                }
                            },
                            {
                                "label": "AS",
                                "positive": {
                                    "currentYear": 90,
                                    "priorYear": 89
                                },
                                "negative": {
                                    "currentYear": 10,
                                    "priorYear": 11
                                }
                            },
                            {
                                "label": "FI",
                                "positive": {
                                    "currentYear": 93,
                                    "priorYear": 92
                                },
                                "negative": {
                                    "currentYear": 7,
                                    "priorYear": 8
                                }
                            }
                        ]
                    },
                    "metOrExceeded": {
                        "type": "pyramidOverUnderChart",
                        "data": [
                            {
                                "label": 2016,
                                "positive": 0,
                                "negative": 0
                            },
                            {
                                "label": 2017,
                                "positive": 0,
                                "negative": 0
                            },
                            {
                                "label": 2018,
                                "positive": 81.66666666666667,
                                "negative": 18.333333333333332
                            },
                            {
                                "label": 2019,
                                "positive": 82.88888888888889,
                                "negative": 17.11111111111111
                            }
                        ]
                    }
                },
                {
                    "title": "Mathematics",
                    "byGradeLevel": {
                        "type": "overUnderChart",
                        "data": [
                            {
                                "label": 3,
                                "positive": {
                                    "currentYear": 72,
                                    "priorYear": 69
                                },
                                "negative": {
                                    "currentYear": 28,
                                    "priorYear": 31
                                }
                            },
                            {
                                "label": 4,
                                "positive": {
                                    "currentYear": 54,
                                    "priorYear": 52
                                },
                                "negative": {
                                    "currentYear": 46,
                                    "priorYear": 48
                                }
                            },
                            {
                                "label": 5,
                                "positive": {
                                    "currentYear": 92,
                                    "priorYear": 94
                                },
                                "negative": {
                                    "currentYear": 8,
                                    "priorYear": 6
                                }
                            },
                            {
                                "label": 6,
                                "positive": {
                                    "currentYear": 69,
                                    "priorYear": 73
                                },
                                "negative": {
                                    "currentYear": 31,
                                    "priorYear": 27
                                }
                            },
                            {
                                "label": 7,
                                "positive": {
                                    "currentYear": 73,
                                    "priorYear": 75
                                },
                                "negative": {
                                    "currentYear": 27,
                                    "priorYear": 25
                                }
                            },
                            {
                                "label": 8,
                                "positive": {
                                    "currentYear": 94,
                                    "priorYear": 90
                                },
                                "negative": {
                                    "currentYear": 6,
                                    "priorYear": 10
                                }
                            },
                            {
                                "label": 9,
                                "positive": {
                                    "currentYear": 66,
                                    "priorYear": 67
                                },
                                "negative": {
                                    "currentYear": 34,
                                    "priorYear": 33
                                }
                            },
                            {
                                "label": 10,
                                "positive": {
                                    "currentYear": 70,
                                    "priorYear": 67
                                },
                                "negative": {
                                    "currentYear": 30,
                                    "priorYear": 33
                                }
                            },
                            {
                                "label": 11,
                                "positive": {
                                    "currentYear": 79,
                                    "priorYear": 84
                                },
                                "negative": {
                                    "currentYear": 21,
                                    "priorYear": 16
                                }
                            }
                        ]
                    },
                    "bySubgroup": {
                        "type": "overUnderChart",
                        "data": [
                            {
                                "label": "SED",
                                "positive": {
                                    "currentYear": 92,
                                    "priorYear": 93
                                },
                                "negative": {
                                    "currentYear": 8,
                                    "priorYear": 7
                                }
                            },
                            {
                                "label": "EL",
                                "positive": {
                                    "currentYear": 100,
                                    "priorYear": 99
                                },
                                "negative": {
                                    "currentYear": 0,
                                    "priorYear": 1
                                }
                            },
                            {
                                "label": "FY",
                                "positive": {
                                    "currentYear": 65,
                                    "priorYear": 65
                                },
                                "negative": {
                                    "currentYear": 35,
                                    "priorYear": 35
                                }
                            },
                            {
                                "label": "HL",
                                "positive": {
                                    "currentYear": 67,
                                    "priorYear": 70
                                },
                                "negative": {
                                    "currentYear": 33,
                                    "priorYear": 30
                                }
                            },
                            {
                                "label": "SWD",
                                "positive": {
                                    "currentYear": 99,
                                    "priorYear": 90
                                },
                                "negative": {
                                    "currentYear": 1,
                                    "priorYear": 10
                                }
                            },
                            {
                                "label": "HL",
                                "positive": {
                                    "currentYear": 69,
                                    "priorYear": 67
                                },
                                "negative": {
                                    "currentYear": 31,
                                    "priorYear": 33
                                }
                            },
                            {
                                "label": "WH",
                                "positive": {
                                    "currentYear": 69,
                                    "priorYear": 62
                                },
                                "negative": {
                                    "currentYear": 31,
                                    "priorYear": 38
                                }
                            },
                            {
                                "label": "BL",
                                "positive": {
                                    "currentYear": 66,
                                    "priorYear": 64
                                },
                                "negative": {
                                    "currentYear": 34,
                                    "priorYear": 36
                                }
                            },
                            {
                                "label": "AS",
                                "positive": {
                                    "currentYear": 73,
                                    "priorYear": 69
                                },
                                "negative": {
                                    "currentYear": 27,
                                    "priorYear": 31
                                }
                            },
                            {
                                "label": "FI",
                                "positive": {
                                    "currentYear": 97,
                                    "priorYear": 88
                                },
                                "negative": {
                                    "currentYear": 3,
                                    "priorYear": 12
                                }
                            }
                        ]
                    },
                    "metOrExceeded": {
                        "type": "pyramidOverUnderChart",
                        "data": [
                            {
                                "label": 2016,
                                "positive": 0,
                                "negative": 0
                            },
                            {
                                "label": 2017,
                                "positive": 0,
                                "negative": 0
                            },
                            {
                                "label": 2018,
                                "positive": 74.55555555555556,
                                "negative": 25.444444444444443
                            },
                            {
                                "label": 2019,
                                "positive": 74.33333333333333,
                                "negative": 25.666666666666668
                            }
                        ]
                    }
                }
            ]
        }
        
### CAASPP By Classroom [GET /data/school/caaspp-by-classroom]

+ Request

        + Params
            + report_type: school
            + data_key: caaspp-by-classroom
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
          "legend" : {
            "exceededOrMet" : {
              "label" : "ELA (E) Met or Exceeded",
              "color" : "#557176"
            },
            "metOrExceeded" : {
              "label" : "Math(M) Met or Exceeded",
              "color" : "#64A399"
            },
            "positive" : {
              "label" : "Positive Change",
              "color" : "#688A8D",
              "shape" : "triangle-up"
            },
            "negative" : {
              "label" : "Negative Change",
              "color" : "#BF8574",
              "shape" : "triangle-down"
            },
          },
          "charts" : [
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceededOrMet" : 30,
                  "metOrExceeded" : 9,
                },
                "meta" : {
                  "numOfScore" : 22,
                  "english" : 2.1
                  "math" : -4.2
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceededOrMet" : 30,
                  "metOrExceeded" : 9,
                },
                "meta" : {
                  "numOfScore" : 22,
                  "english" : 2.1
                  "math" : -4.2
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceededOrMet" : 30,
                  "metOrExceeded" : 9,
                },
                "meta" : {
                  "numOfScore" : 22,
                  "english" : 2.1
                  "math" : -4.2
                }
              }
            },
            {
              "label" : "2-2.A.GZ",
              "data"  : {
                "chart" : {
                  "exceededOrMet" : 30,
                  "metOrExceeded" : 9,
                },
                "meta" : {
                  "numOfScore" : 22,
                  "english" : 2.1
                  "math" : -4.2
                }
              }
            }
          ]
        }

### ELPAC By Grade Level and Subgroup [GET /data/school/elpac-by-grade-level-and-subgroup]

+ Request

        + Params
            + report_type: school
            + data_key: elpac-by-classroom
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "legends": {
                "domainLevels": {
                    "title": "Domain Levels",
                    "items": {
                        "level3": {
                            "color": "#93ADB4",
                            "label": "Level 3 - Well Developed"
                        },
                        "level2": {
                            "color": "#747776",
                            "label": "Level 2 - Somewhat/Moderately"
                        },
                        "level1": {
                            "color": "#C8C8C8",
                            "label": "Level 1 - Basic"
                        }
                    }
                },
                "elpacLevels": {
                    "title": "ELPAC Levels",
                    "items": {
                        "level4": {
                            "color": "#577077",
                            "label": "Level 4 - Well Developed"
                        },
                        "level3": {
                            "color": "#63A49A",
                            "label": "Level 3 - Moderately Developed"
                        },
                        "level2": {
                            "color": "#D8A455",
                            "label": "Level 2 - Somewhat Developed"
                        },
                        "level1": {
                            "color": "#993E39",
                            "label": "Level 1 - Beginning Stage"
                        }
                    }
                },
                "odometerChart": {
                    "inner": {
                        "label": "Writing"
                    },
                    "outer": {
                        "label": "Reading"
                    }
                }
            },
            "charts": [
                {
                    "title": "By Grade Level",
                    "subTitle": "(% of Students at Well or Moderately Developed)",
                    "color": "#577077",
                    "yAxisLabel": "Well or Moderately Developed (Percent)",
                    "type": "bar-chart",
                    "data": [
                        {
                            "label": "K",
                            "value": 89
                        },
                        {
                            "label": "1",
                            "value": 16
                        },
                        {
                            "label": "2",
                            "value": 88
                        },
                        {
                            "label": "3",
                            "value": 2
                        },
                        {
                            "label": "4",
                            "value": 16
                        },
                        {
                            "label": "5",
                            "value": 60
                        },
                        {
                            "label": "6",
                            "value": 96
                        },
                        {
                            "label": "7",
                            "value": 96
                        },
                        {
                            "label": "8",
                            "value": 65
                        },
                        {
                            "label": "9",
                            "value": 66
                        },
                        {
                            "label": "10",
                            "value": 14
                        },
                        {
                            "label": "11",
                            "value": 80
                        },
                        {
                            "label": "12",
                            "value": 93
                        }
                    ]
                },
                {
                    "title": "By Sub Group",
                    "subTitle": "(% of Students at Well or Moderately Developed)",
                    "color": "#577077",
                    "yAxisLabel": "Well or Moderately Developed (Percent)",
                    "type": "bar-chart",
                    "data": [
                        {
                            "label": "SED",
                            "value": 95
                        },
                        {
                            "label": "EL",
                            "value": 9
                        },
                        {
                            "label": "FY",
                            "value": 35
                        },
                        {
                            "label": "HL",
                            "value": 25
                        },
                        {
                            "label": "SWD",
                            "value": 0
                        },
                        {
                            "label": "HL",
                            "value": 63
                        },
                        {
                            "label": "WH",
                            "value": 9
                        },
                        {
                            "label": "BL",
                            "value": 12
                        },
                        {
                            "label": "AS",
                            "value": 24
                        },
                        {
                            "label": "FI",
                            "value": 0
                        }
                    ]
                },
                {
                    "data": {
                        "level1": 16.38,
                        "level2": 39.160000000000004,
                        "level3": 31.53,
                        "level4": 12.93
                    },
                    "type": "rainbow-chart",
                    "title": "Overall Score",
                    "legend": "elpacLevels"
                },
                {
                    "left": {
                        "data": {
                            "level1": 20.63,
                            "level2": 41,
                            "level3": 26.91,
                            "level4": 11.459999999999999
                        },
                        "type": "rainbow-chart",
                        "title": "Written Language Score",
                        "legend": "elpacLevels"
                    },
                    "right": {
                        "inner": {
                            "level1": 19.16,
                            "level2": 54,
                            "level3": 26.84
                        },
                        "outer": {
                            "level1": 28.64,
                            "level2": 39.02,
                            "level3": 32.34
                        },
                        "type": "odometer-chart",
                        "legend": {
                            "inner": {
                                "label": "Writing"
                            },
                            "outer": {
                                "label": "Reading"
                            }
                        }
                    },
                    "type": "ocular-chart"
                },
                {
                    "left": {
                        "inner": {
                            "level1": 23.84,
                            "level2": 46.16,
                            "level3": 30
                        },
                        "outer": {
                            "level1": 21.93,
                            "level2": 45.98,
                            "level3": 32.09
                        },
                        "type": "odometer-chart",
                        "legend": {
                            "inner": {
                                "label": "Speaking"
                            },
                            "outer": {
                                "label": "Listening"
                            }
                        }
                    },
                    "right": {
                        "data": {
                            "level1": 17,
                            "level2": 40.01,
                            "level3": 29,
                            "level4": 13.99
                        },
                        "type": "rainbow-chart",
                        "title": "Oral Language Score",
                        "legend": "elpacLevels"
                    },
                    "type": "ocular-chart"
                }
            ]
        }

### ELPAC By Classroom [GET /data/school/elpac-by-classroom]

+ Request

        + Params
            + report_type: school
            + data_key: elpac-by-classroom
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {   
            "legend" : {
                "level4" : {
                    "label" : "Level 4 - Well Development",
                    "color" : "#577077"
                },
                "level3" : {
                    "label" : "Level 3 - Moderately Development",
                    "color" : "#63A49A"
                },
                "level2" : {
                    "label" : "Level 2 - Somewhat Development",
                    "color" : "#D8A455"
                },
                "level1" : {
                    "label" : "Level 1 - Beginning Stage",
                    "color" : "#993E39"
                },
            },
            "charts" : [
                {   
                    "label" : "3-3.A.MJ"
                    "data" : {
                        "level4" : 49,
                        "level3" : 23,
                        "level2" : 26,
                        "level1" : 48,
                    },
                    "meta" : {
                        "lvl3+4" : "35%",
                        "scores" : 23
                    }
                },
            ]
        }

### Behavior Incidents Overview [GET /data/student/behavior-incidents-overview]

+ Request

        + Params
            + report_type: student
            + data_key: behavior-incidents-overview
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "legend": {
                "currentYear": {
                    "label": "Current Year",
                    "color": "#9E5A46"
                },
                "priorYear": {
                    "label": "Prior Year",
                    "color": "#9E5A46",
                    "style": "striped"
                }
            },
            "charts": {
                "byGradeLevel": {
                    "title": "By Grade Level",
                    "type": "double-bar-chart",
                    "data": [
                        {
                            "label": "K",
                            "value": {
                                "currentYear": 0,
                                "priorYear": 7
                            }
                        },
                        {
                            "label": "1",
                            "value": {
                                "currentYear": 22,
                                "priorYear": 19
                            }
                        },
                        {
                            "label": "2",
                            "value": {
                                "currentYear": 21,
                                "priorYear": 31
                            }
                        },
                        {
                            "label": "3",
                            "value": {
                                "currentYear": 28,
                                "priorYear": 33
                            }
                        },
                        {
                            "label": "4",
                            "value": {
                                "currentYear": 1,
                                "priorYear": 2
                            }
                        },
                        {
                            "label": "5",
                            "value": {
                                "currentYear": 30,
                                "priorYear": 8
                            }
                        },
                        {
                            "label": "6",
                            "value": {
                                "currentYear": 9,
                                "priorYear": 13
                            }
                        },
                        {
                            "label": "7",
                            "value": {
                                "currentYear": 34,
                                "priorYear": 1
                            }
                        },
                        {
                            "label": "8",
                            "value": {
                                "currentYear": 29,
                                "priorYear": 6
                            }
                        },
                        {
                            "label": "9",
                            "value": {
                                "currentYear": 5,
                                "priorYear": 34
                            }
                        },
                        {
                            "label": "10",
                            "value": {
                                "currentYear": 18,
                                "priorYear": 26
                            }
                        },
                        {
                            "label": "11",
                            "value": {
                                "currentYear": 5,
                                "priorYear": 22
                            }
                        },
                        {
                            "label": "12",
                            "value": {
                                "currentYear": 30,
                                "priorYear": 0
                            }
                        }
                    ]
                },
                "bySubGroup": {
                    "title": "By Grade Level",
                    "type": "double-bar-chart",
                    "data": [
                        {
                            "label": "SED",
                            "value": {
                                "currentYear": 9,
                                "priorYear": 13
                            }
                        },
                        {
                            "label": "EL",
                            "value": {
                                "currentYear": 0,
                                "priorYear": 0
                            }
                        },
                        {
                            "label": "FY",
                            "value": {
                                "currentYear": 3,
                                "priorYear": 0
                            }
                        },
                        {
                            "label": "HL",
                            "value": {
                                "currentYear": 10,
                                "priorYear": 14
                            }
                        },
                        {
                            "label": "SWD",
                            "value": {
                                "currentYear": 0,
                                "priorYear": 28
                            }
                        },
                        {
                            "label": "HL",
                            "value": {
                                "currentYear": 22,
                                "priorYear": 1
                            }
                        },
                        {
                            "label": "WH",
                            "value": {
                                "currentYear": 10,
                                "priorYear": 0
                            }
                        },
                        {
                            "label": "BL",
                            "value": {
                                "currentYear": 16,
                                "priorYear": 0
                            }
                        },
                        {
                            "label": "AS",
                            "value": {
                                "currentYear": 16,
                                "priorYear": 1
                            }
                        },
                        {
                            "label": "FI",
                            "value": {
                                "currentYear": 35,
                                "priorYear": 21
                            }
                        }
                    ]
                },
                "overAll": {
                    "type": "emphasis-bar-chart",
                    "title": "Overall Number of Behavior Incidents",
                    "data": {
                        "currentYear": 232,
                        "priorYear": 202
                    }
                }
            }
        }
        
### Behavior Incidents Disaggregated [GET /data/school/behavior-incidents-disaggregated]

+ Request

        + Params
            + report_type: school
            + data_key: behavior-incidents-disaggregated
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {   
            "legend" : {
                "total" : {
                    "label" : "Total number of behavior incidents by race/ethnic group",
                    "color" : "#9B3E3A"
                },
                "hi" : : {
                   "label" : "HI",
                   "color" : "#9B3E3A"
                },
                "wh" : {
                   "label" : "WH",
                   "color" : "#9B3E3A"
                },
                "bl" : {
                   "label" : "BL",
                   "color" : "#9B3E3A"
                },
                "as" : {
                   "label" : "AS",
                   "color" : "#9B3E3A"
                },
                "fi" : {
                   "label" : "FI",
                   "color" : "#9B3E3A"
                }
            },
            "charts" : [
                {   
                    "label" : "3-3.A.MJ"
                    "data" : {
                        "hi" : 49,
                        "wh" : 23,
                        "bl" : 26,
                        "as" : 48,
                        "fi" : 48
                    },
                    "meta" : {
                        "incidents" : 6
                    }
                },
            ]
        }

### Certificated Attendance Overview [GET /data/staff/certificated-attendance-overview]

+ Request

        + Params
            + report_type: staff
            + data_key: certificated-attendance-overview
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "avgInstructionalHours" : {
                "value" : 85,
                "label" : "Average Total Instructional Hours Delivered"
            },
            "instructionalHoursNotDelivered" : {
                "label" : "of instructional hours not delivered",
                "pct" : 15,
                "num" : 4273
            },
        }

### Certificated Attendance Disaggregated [GET /data/staff/certificated-attendance-disaggregated]

+ Request

        + Params
            + report_type: staff
            + data_key: certificated-attendance-disaggregated
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "legend": {
                "fullAbsence": {
                    "shape": "triangle",
                    "label": "Full Day Absence (non-PD/non-Jury Duty)"
                },
                "partialAbsence": {
                    "shape": "circle",
                    "label": "Partial Day Absence (non-PD/non-Jury Dury)"
                },
                "totalInstruction": {
                    "label": "Total Instructional Minutes Delivered (in percent)",
                    "shape": "square",
                    "color": "#D0BA49",
                    "style": "striped"
                },
                "full": {
                    "title": "Full",
                    "label": "Total number of full day absences."
                },
                "partial": {
                    "title": "Partial",
                    "label": "Total number of partial day absences."
                },
                "teacherCode": {
                    "title": "#.A.AB",
                    "label": "Grade Level. Teacher’s Last Name Initial. Teacher’s first two letters of First Name"
                }
            },
            "chart": {
                "range": {
                    "start": "2018-07-01T06:00:00.000Z",
                    "end": "2019-06-30T06:00:00.000Z"
                },
                "data": [
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-11T15:11:59.379Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-14T03:02:44.529Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-11T11:00:28.156Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-21T03:46:44.386Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-05T10:57:05.312Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-05T05:17:00.686Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-15T09:23:51.068Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-09T01:37:24.274Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-26T06:59:34.201Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-24T02:23:01.439Z"
                                }
                            ],
                            "totalInstruction": 95,
                            "full": 4,
                            "partial": 6
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-06T08:41:41.033Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-18T08:41:58.230Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-23T17:40:28.739Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-27T23:43:01.745Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-16T02:45:02.889Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-23T09:12:49.696Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-24T02:59:54.887Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-15T00:12:51.335Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-24T01:51:51.988Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-25T00:10:14.722Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-31T15:02:06.925Z"
                                }
                            ],
                            "totalInstruction": 94.5,
                            "full": 7,
                            "partial": 4
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-01T10:38:28.317Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-20T14:31:24.176Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-26T02:09:58.725Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-03T15:45:29.623Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-26T20:57:23.201Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-04T01:48:04.294Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-18T07:38:11.071Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-16T00:33:56.134Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-13T00:34:26.486Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-11T01:09:52.292Z"
                                }
                            ],
                            "totalInstruction": 95,
                            "full": 2,
                            "partial": 8
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-29T07:48:32.346Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-05T09:09:23.581Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-06T13:25:33.100Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-23T12:18:36.054Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-10T16:57:14.326Z"
                                }
                            ],
                            "totalInstruction": 97.5,
                            "full": 3,
                            "partial": 2
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-04T22:49:08.544Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-11T22:06:20.311Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-12T12:29:20.205Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-02T08:52:58.466Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-23T10:10:44.680Z"
                                }
                            ],
                            "totalInstruction": 97.5,
                            "full": 2,
                            "partial": 3
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-20T22:05:58.145Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-26T01:39:35.995Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-08T03:34:29.292Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-31T01:40:41.541Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-02T03:57:50.111Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-22T17:59:20.349Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-16T15:43:36.528Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-18T23:36:02.369Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-10T05:17:08.500Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-17T18:48:18.011Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-16T00:39:18.745Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-28T22:47:26.380Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-29T12:11:43.972Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-09T23:32:58.177Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-12T17:49:52.376Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-07T14:47:53.459Z"
                                }
                            ],
                            "totalInstruction": 92,
                            "full": 9,
                            "partial": 7
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-19T06:02:48.267Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-03T20:24:11.556Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-06T05:56:24.244Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-08T14:16:37.819Z"
                                }
                            ],
                            "totalInstruction": 98,
                            "full": 1,
                            "partial": 3
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-23T22:14:35.782Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-30T20:53:21.636Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-22T14:09:45.180Z"
                                }
                            ],
                            "totalInstruction": 98.5,
                            "full": 1,
                            "partial": 2
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-11T12:21:18.672Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-30T15:53:06.711Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-22T20:10:28.185Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-20T22:55:54.695Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-06T10:43:40.520Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-04T17:46:56.044Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-12T23:06:55.023Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-18T22:55:22.157Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-25T23:24:31.251Z"
                                }
                            ],
                            "totalInstruction": 95.5,
                            "full": 2,
                            "partial": 7
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-18T22:47:22.992Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-04T17:11:10.338Z"
                                }
                            ],
                            "totalInstruction": 99,
                            "full": 2,
                            "partial": 0
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-01T11:34:42.190Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-09T17:47:15.118Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-22T11:38:09.807Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-13T19:50:06.770Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-17T17:02:53.392Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-03T01:16:31.156Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-21T17:39:30.008Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-16T11:12:38.367Z"
                                }
                            ],
                            "totalInstruction": 96,
                            "full": 6,
                            "partial": 2
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-21T13:21:26.062Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-02T06:48:51.117Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-15T11:52:15.995Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-03T01:46:21.418Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-05T00:28:17.812Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-12T16:39:26.649Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-09T14:58:05.242Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-10T09:22:19.872Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-04T07:02:19.560Z"
                                }
                            ],
                            "totalInstruction": 95.5,
                            "full": 3,
                            "partial": 6
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-02T15:36:01.834Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-20T15:11:59.163Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-08T15:21:50.489Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-17T19:13:02.918Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-04T16:33:33.514Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-05T18:00:32.827Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-01T07:27:31.269Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-31T04:38:53.543Z"
                                }
                            ],
                            "totalInstruction": 96,
                            "full": 3,
                            "partial": 5
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-29T04:55:40.681Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-31T04:40:20.065Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-10T12:55:42.380Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-15T22:29:20.804Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-03T08:50:51.996Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-11T18:15:36.942Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-13T13:45:22.013Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-26T17:57:16.026Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-08T04:41:40.856Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-11T01:07:32.109Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-05T13:07:49.861Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-15T10:05:27.687Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-23T01:53:33.761Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-21T22:25:28.379Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-06T10:52:58.788Z"
                                }
                            ],
                            "totalInstruction": 92.5,
                            "full": 7,
                            "partial": 8
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-08T01:42:27.757Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-07T19:51:54.535Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-20T19:29:43.758Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-10T23:25:03.066Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-27T05:40:49.421Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-31T18:24:33.347Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-01T12:08:32.146Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-12T01:10:03.675Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-14T04:33:15.840Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-03T16:09:07.170Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-22T07:47:26.037Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-10T06:01:35.628Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-27T11:26:24.230Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-29T03:49:37.577Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-15T12:52:02.463Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-18T06:55:16.338Z"
                                }
                            ],
                            "totalInstruction": 92,
                            "full": 7,
                            "partial": 9
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-03T22:37:14.611Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-10T01:13:42.759Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-16T19:29:16.226Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-22T10:30:11.923Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-15T10:27:51.663Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-16T22:37:54.498Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-21T19:33:18.422Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-17T15:59:26.203Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-30T16:58:00.390Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-07T16:09:28.536Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-25T13:25:45.635Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-11T08:29:25.031Z"
                                }
                            ],
                            "totalInstruction": 94,
                            "full": 9,
                            "partial": 3
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-07T06:45:51.439Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-10T05:03:33.288Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-11T21:13:02.240Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-19T15:52:26.858Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-28T23:51:12.402Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-14T12:05:22.679Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-17T06:49:15.919Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-03T06:07:49.979Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-20T23:42:50.707Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-20T14:44:08.925Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-07T20:55:22.522Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-29T13:16:33.328Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-21T08:22:51.397Z"
                                }
                            ],
                            "totalInstruction": 93.5,
                            "full": 5,
                            "partial": 8
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-04T13:42:06.199Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-17T08:11:04.049Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-17T01:03:12.523Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-01T14:20:26.206Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-09T09:22:29.249Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-02T01:07:50.800Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-27T00:36:45.350Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-22T21:50:31.634Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-27T06:22:21.834Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-15T22:23:16.527Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-17T10:54:41.561Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-30T10:15:30.606Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-04T03:59:53.117Z"
                                }
                            ],
                            "totalInstruction": 93.5,
                            "full": 2,
                            "partial": 11
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-28T19:30:26.880Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-09T00:13:49.513Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-26T20:53:27.919Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-05T03:51:34.949Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-10T02:21:07.309Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-14T08:22:32.001Z"
                                }
                            ],
                            "totalInstruction": 97,
                            "full": 2,
                            "partial": 4
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-28T13:54:08.868Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-09T01:20:27.559Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-07T06:53:01.649Z"
                                }
                            ],
                            "totalInstruction": 98.5,
                            "full": 1,
                            "partial": 2
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-30T18:30:47.397Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-22T07:42:28.307Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-09T18:57:33.854Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-02T10:10:50.095Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-04T09:07:19.471Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-01T13:42:39.466Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-31T13:41:14.300Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-25T00:49:24.982Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-03T04:34:10.463Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-16T19:45:22.658Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-07T07:37:12.497Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-20T18:37:42.006Z"
                                }
                            ],
                            "totalInstruction": 94,
                            "full": 3,
                            "partial": 9
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-15T17:01:57.695Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-16T18:13:10.534Z"
                                }
                            ],
                            "totalInstruction": 99,
                            "full": 1,
                            "partial": 1
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-14T10:28:32.512Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-12T04:36:56.646Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-28T07:19:37.980Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-02T02:04:22.945Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-12T11:27:20.887Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-16T16:08:27.953Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-22T08:11:49.670Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-18T23:20:52.220Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-23T23:53:58.991Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-03T13:45:03.301Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-26T09:19:05.248Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-14T09:22:50.092Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-29T10:41:22.022Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-29T18:00:15.798Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-21T21:24:41.333Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-16T14:23:33.266Z"
                                }
                            ],
                            "totalInstruction": 92,
                            "full": 10,
                            "partial": 6
                        }
                    }
                ]
            }
        }

### Classified Attendance Overview [GET /data/staff/classified-attendance-overview]

+ Request

        + Params
            + report_type: classified
            + data_key: certificated-attendance-overview
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "numOfEmployees" : 22,
            "charts" : [
                {
                    "title" : "Number of Classified Employess with one or More Absences",
                    "legend" : {
                        "default" : {
                            "color" : "#3F5356"
                        }
                    },
                    "data": [
                        {
                            "label" : "More than 10",
                            "value" : 6,
                        },
                        {
                            "label" : "6 to 9",
                            "value" : 4,
                        },
                        {
                            "label" : "3 to 5",
                            "value" : 2,
                        },
                        {
                            "label" : "1 to 2",
                            "value" : 8,
                        },
                    ]
                }
            ]
        }

### Classified Attendance Disaggregated [GET /data/staff/classified-attendance-disaggregated]

+ Request

        + Params
            + report_type: classified
            + data_key: certificated-attendance-disaggregated
        
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "legend": {
                "fullAbsence": {
                    "shape": "triangle",
                    "label": "Full Day Absence (non-PD/non-Jury Duty)"
                },
                "partialAbsence": {
                    "shape": "circle",
                    "label": "Partial Day Absence (non-PD/non-Jury Dury)"
                },
                "full": {
                    "title": "Full",
                    "label": "Total number of full day absences."
                },
                "partial": {
                    "title": "Partial",
                    "label": "Total number of partial day absences."
                },
                "teacherCode": {
                    "title": "#.A.AB",
                    "label": "Grade Level. Teacher’s Last Name Initial. Teacher’s first two letters of First Name"
                },
                "totalAbsences": {
                    "hide": true,
                    "label": "Number of Absences"
                }
            },
            "chart": {
                "range": {
                    "start": "2018-07-01T06:00:00.000Z",
                    "end": "2019-06-30T06:00:00.000Z"
                },
                "data": [
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-29T18:44:58.823Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-11T22:30:12.023Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-20T23:05:42.291Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-01T22:09:39.356Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-11T10:20:53.793Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-12T03:50:32.683Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-27T17:39:12.104Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-18T21:40:08.756Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-15T12:58:05.734Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-08T11:23:45.269Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-12T22:03:03.273Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-11T08:38:18.725Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-12T09:40:41.390Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-11T18:29:47.661Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-21T02:35:51.376Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-26T04:23:04.927Z"
                                }
                            ],
                            "numberOfAbsences": 16
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-12T12:10:29.615Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-04T20:07:37.612Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-26T22:27:01.854Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-25T16:56:01.242Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-25T11:24:28.774Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-17T06:55:38.275Z"
                                }
                            ],
                            "numberOfAbsences": 6
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-30T08:19:23.709Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-26T15:07:47.356Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-25T13:16:08.110Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-17T09:35:28.658Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-24T05:25:30.587Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-29T22:48:11.987Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-19T12:15:30.546Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-17T01:08:25.831Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-14T19:51:48.737Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-21T12:49:16.557Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-16T19:18:57.902Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-20T11:47:40.635Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-13T01:31:01.560Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-21T15:08:06.816Z"
                                }
                            ],
                            "numberOfAbsences": 14
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-09T17:30:10.688Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-15T21:40:16.994Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-11T14:10:20.009Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-27T14:53:09.981Z"
                                }
                            ],
                            "numberOfAbsences": 4
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-14T23:09:56.508Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-21T08:44:30.886Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-19T05:40:47.031Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-12T19:48:26.178Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-23T09:07:14.328Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-09T07:49:32.824Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-26T18:08:20.548Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-30T22:56:56.290Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-13T15:17:48.885Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-23T22:11:54.029Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-22T06:11:51.664Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-08T08:58:34.824Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-01T17:40:08.817Z"
                                }
                            ],
                            "numberOfAbsences": 13
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-07T19:09:33.629Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-18T06:32:48.936Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-21T07:45:00.464Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-30T16:59:32.740Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-15T13:24:30.411Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-24T17:56:33.938Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-18T16:41:28.561Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-11T10:55:16.004Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-26T11:32:15.001Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-27T18:02:11.948Z"
                                }
                            ],
                            "numberOfAbsences": 10
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-14T08:39:54.691Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-28T19:22:10.626Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-24T17:38:57.880Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-28T01:57:30.605Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-21T23:09:01.538Z"
                                }
                            ],
                            "numberOfAbsences": 5
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-26T10:13:15.413Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-20T02:03:22.430Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-21T21:40:29.060Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-09T03:23:32.444Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-10T10:19:11.077Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-16T13:55:11.470Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-18T07:08:53.612Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-01T05:37:34.571Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-08T08:27:26.677Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-11T08:20:17.297Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-09T09:03:49.556Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-18T04:05:28.991Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-16T03:57:28.751Z"
                                }
                            ],
                            "numberOfAbsences": 13
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-14T10:44:47.106Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-24T05:14:26.495Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-20T00:23:27.411Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-09T16:53:41.214Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-16T04:41:52.970Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-09T09:54:22.514Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-19T01:06:21.701Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-30T19:52:37.085Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-21T11:45:38.480Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-29T07:53:45.740Z"
                                }
                            ],
                            "numberOfAbsences": 10
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-26T11:14:22.356Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-25T05:54:15.657Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-11T12:01:25.263Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-26T12:50:04.611Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-01T21:20:22.066Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-05T21:13:42.734Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-05T13:35:43.768Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-01T09:23:17.568Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-26T09:26:22.126Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-23T20:47:50.783Z"
                                }
                            ],
                            "numberOfAbsences": 10
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-05T04:56:54.871Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-09T10:47:42.119Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-19T05:32:02.041Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-05T13:49:39.420Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-24T14:56:54.844Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-24T02:39:23.860Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-03T09:42:29.122Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-26T06:56:37.876Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-24T18:48:04.537Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-03T16:39:05.533Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-29T11:20:22.650Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-12T16:42:56.553Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-08T04:40:20.042Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-16T03:39:18.371Z"
                                }
                            ],
                            "numberOfAbsences": 14
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-09T23:37:01.166Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-24T20:43:26.813Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-15T11:38:02.636Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-04T20:06:57.012Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-17T00:39:14.617Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-02T05:41:44.042Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-20T17:41:53.056Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-02T01:56:11.882Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-18T19:21:12.433Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-16T17:23:51.920Z"
                                }
                            ],
                            "numberOfAbsences": 10
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-17T17:06:49.025Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-10T12:28:39.277Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-30T22:10:18.427Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-15T04:13:09.496Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-27T07:35:32.614Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-30T15:48:42.591Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-14T04:52:33.172Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-03T10:01:12.631Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-27T08:27:07.974Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-23T22:15:10.020Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-01T16:33:24.114Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-30T14:51:22.894Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-21T04:34:10.451Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-27T11:08:45.405Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-24T23:03:57.259Z"
                                }
                            ],
                            "numberOfAbsences": 15
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-06T07:53:46.387Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-15T09:22:02.148Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-24T18:29:53.606Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-30T04:43:17.659Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-19T19:21:24.924Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-23T13:06:51.357Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-19T19:46:42.739Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-06T11:45:29.139Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-04T11:27:32.712Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-01T08:45:09.229Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-31T03:04:03.531Z"
                                }
                            ],
                            "numberOfAbsences": 11
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-24T02:19:55.008Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-26T11:31:38.740Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-26T16:58:06.754Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-09T19:20:59.181Z"
                                }
                            ],
                            "numberOfAbsences": 4
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-05T18:13:12.252Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-29T06:51:18.002Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-06T03:14:06.290Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-19T01:05:13.523Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-22T02:09:51.756Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-30T09:21:39.899Z"
                                }
                            ],
                            "numberOfAbsences": 6
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-07T19:44:58.173Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-27T11:32:11.367Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-04T21:43:33.065Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-06-16T07:24:43.956Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-09T04:31:17.778Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-13T09:24:50.142Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-10T09:54:50.457Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-25T05:07:56.453Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-08T17:08:54.282Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-19T15:18:40.084Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-20T10:44:06.033Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-29T11:37:46.260Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-20T01:48:59.030Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-24T00:07:25.068Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-29T01:23:23.834Z"
                                }
                            ],
                            "numberOfAbsences": 15
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-02T04:21:26.560Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-23T10:55:19.921Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-01T14:46:39.087Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-06T02:43:55.239Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-10-26T06:28:56.710Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-24T15:25:20.209Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-10T06:37:36.904Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-25T16:15:02.995Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-03-23T09:41:37.758Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-17T14:45:59.028Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-26T01:41:05.483Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-02T01:55:00.752Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-04T11:30:47.525Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-26T23:27:28.398Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-18T01:36:05.682Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-30T05:41:10.395Z"
                                }
                            ],
                            "numberOfAbsences": 16
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-10T19:09:19.327Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-12T03:55:05.525Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-04T07:51:13.145Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-22T15:19:29.974Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-07-13T18:28:52.305Z"
                                }
                            ],
                            "numberOfAbsences": 5
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-03T04:26:17.497Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-11T01:32:11.871Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-27T14:29:46.425Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-30T12:29:37.482Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-29T02:26:36.778Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-23T02:43:36.311Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-17T00:57:44.463Z"
                                }
                            ],
                            "numberOfAbsences": 7
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-08T13:51:42.442Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-05T06:43:07.209Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-12T01:24:30.014Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-15T13:36:40.828Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-08-18T21:59:35.336Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-12-03T08:11:49.023Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-02-05T12:53:31.741Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-11-18T10:39:52.966Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-02-13T09:42:35.860Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-09-28T05:38:31.072Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-01-26T14:18:05.410Z"
                                }
                            ],
                            "numberOfAbsences": 11
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-01-30T12:25:20.320Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-05-28T19:29:13.216Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-30T01:34:03.275Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-23T17:40:32.366Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-09T13:46:17.343Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-23T17:20:44.734Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-03-31T03:32:46.784Z"
                                }
                            ],
                            "numberOfAbsences": 7
                        }
                    },
                    {
                        "label": "3-3.A.MJ",
                        "type": "attendance-chart",
                        "data": {
                            "absences": [
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-21T13:33:17.290Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-27T16:37:57.311Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-20T21:39:09.414Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-11-02T00:41:39.592Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-10-29T07:50:54.864Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-04-18T14:37:21.207Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-08-01T18:41:33.162Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-04T22:33:05.314Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-04-17T17:22:46.810Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2018-09-17T10:29:40.324Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-13T13:48:39.785Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2019-05-10T01:04:05.902Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-12-22T19:08:51.925Z"
                                },
                                {
                                    "type": "partialAbsence",
                                    "date": "2019-06-23T15:07:16.217Z"
                                },
                                {
                                    "type": "fullAbsence",
                                    "date": "2018-07-28T02:30:34.211Z"
                                }
                            ],
                            "numberOfAbsences": 15
                        }
                    }
                ]
            }
        }
        
### School Survey Results [GET /data/?/school-survey-results]

+ Request

        + Params
            + report_type: ?
            + data_key: certificated-attendance-disaggregated
            
        + Query
            + year: `2019-2020` (String) - The relevant school year
            + identityId: `20` (String) - The relevant id
            
+ Response 200 (application/json)

        {
            "legend": {
                "percentFavorable": {
                    "title": "Percent Favorable:",
                    "label": "The total percentage of respondants that selected a favorable choice."
                }
            },
            "data": [
                {
                    "label": "Topic",
                    "postChar": "%",
                    "data": [
                        {
                            "question": "School Safety",
                            "value": 36
                        },
                        {
                            "question": "School Belonging",
                            "value": 48
                        },
                        {
                            "question": "School Engagement",
                            "value": 49
                        },
                        {
                            "question": "School Climate",
                            "value": 75
                        }
                    ]
                },
                {
                    "label": "Student Questions",
                    "postChar": "%",
                    "data": [
                        {
                            "question": "How excited are you about going to your classes?",
                            "value": 40
                        },
                        {
                            "question": "How often do you get so focused on activities in your classes that you lose track of time?",
                            "value": 40
                        },
                        {
                            "question": "How often are people disrespectful to others at your school?",
                            "value": 50
                        },
                        {
                            "question": "Overall, how much do you feel like you belong at your school?",
                            "value": 68
                        },
                        {
                            "question": "How often do your teachers seem excited to be teaching your classes?",
                            "value": 36
                        },
                        {
                            "question": "How connected do you feel to the adults at your school?",
                            "value": 55
                        }
                    ]
                },
                {
                    "label": "Parent Questions",
                    "postChar": "%",
                    "data": [
                        {
                            "question": "How well do administrators at your child’s school create a school environment that helps children learn?",
                            "value": 20
                        },
                        {
                            "question": "Overall, how much respect do you think the teachers at your child’s school have for the children?",
                            "value": 23
                        },
                        {
                            "question": "Overall, how unsafe does your child feel at school?",
                            "value": 71
                        },
                        {
                            "question": "How motivating are the classroom lessons at your child’s school?",
                            "value": 36
                        },
                        {
                            "question": "The office staff at my child’s school is always professional and respectful of my time.",
                            "value": 53
                        }
                    ]
                },
                {
                    "title": "Teacher Survey Results",
                    "label": "Teacher Questions",
                    "postChar": "%",
                    "data": [
                        {
                            "question": "Teachers in this school believe that every student can learn.",
                            "value": 46
                        },
                        {
                            "question": "I feel that my school is consistent with student disciplinary issues.",
                            "value": 75
                        }
                    ]
                }
            ]
        }

### Create a New Question [POST]

You may create your own question using this action. It takes a JSON
object containing a question and a collection of answers in the
form of choices.

+ Request (application/json)

        {
            "question": "Favourite programming language?",
            "choices": [
                "Swift",
                "Python",
                "Objective-C",
                "Ruby"
            ]
        }

+ Response 201 (application/json)

    + Headers

            Location: /questions/2

    + Body

            {
                "question": "Favourite programming language?",
                "published_at": "2015-08-05T08:40:51.620Z",
                "choices": [
                    {
                        "choice": "Swift",
                        "votes": 0
                    }, {
                        "choice": "Python",
                        "votes": 0
                    }, {
                        "choice": "Objective-C",
                        "votes": 0
                    }, {
                        "choice": "Ruby",
                        "votes": 0
                    }
                ]
            }

### Get Years [GET /years]

+ Response 201 (application/json)

    + Body
            
            [
                {
                    "orderBy" : 1,
                    "label"   : "19/20",
                    "value"   : "CurrentYear"
                },
                {
                    "orderBy" : 2,
                    "label"   : "18/19",
                    "value"   : "PrevYear"
                },
                {
                    "orderBy" : 3,
                    "label"   : "17/18",
                    "value"   : "PrevYear2"
                }
            ]