define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title: 'Home', moduleId: 'viewmodels/home', nav: true },
                { route: 'playground', title: 'Playground', moduleId: 'viewmodels/playground', nav: false },
                { route: 'registered', title: 'Registered', moduleId: 'viewmodels/registered', nav: true },
                { route: 'register/:entityId', title: 'Register', moduleId: 'viewmodels/register', nav: false }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});