import personChildren from './personChildren.js'

const homeChildren = [
    {
        path: 'order',
        component: () => import('../views/Order.vue')
    },
    {
        path: 'person',
        component: () => import('../views/Person.vue'),
        children: personChildren
    }
]

export default homeChildren