import { createRoute, createRootRoute, createRouter, Outlet } from '@tanstack/react-router'
import Homepage from './pages/Homepage'
import CharacterDetails from './pages/CharacterDetails'
import Navbar from './components/Navbar';
export const pageRoutes = {
    homepage: '/',
    characterDetails: '/character-details/$id',
}

const rootRoute = createRootRoute({
    component: () => (
        <>
            <Navbar />
            <Outlet />
        </>

    ),
})

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: pageRoutes.homepage,
    component: Homepage,
})
const detailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: pageRoutes.characterDetails,
    component: CharacterDetails,
})

const routeTree = rootRoute.addChildren([homeRoute, detailsRoute])

export const router = createRouter({ routeTree })