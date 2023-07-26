import { createRouter, createWebHistory } from 'vue-router'
import Year from "../components/Year.vue"
import Month from "../components/Month.vue"
import Week from "../components/Week.vue"
import Day from "../components/Day.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "Home",
            component: Month,
        },
        {
            path: "/month",
            name: "Month",
            component: Month,
        },
        {
            path: "/year",
            name: "Year",
            component: Year,
        },
        {
            path: "/week",
            name: "Week",
            component: Week,
        },
        {
            path: "/day/:date",
            name: "Day",
            component: Day,
        },
    ],
})
export default router