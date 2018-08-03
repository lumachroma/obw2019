define(['knockout', 'schemas', 'durandal/system', 'durandal/app', 'plugins/router', 'services/datacontext', 'services/config'],
    function (ko, schemas, system, app, router, context, config) {

        var isBusy = ko.observable(false),
            entities = ko.observableArray([]),
            keyword = ko.observable(),
            keywordProperty = ko.observable("Batch"),
            defaultEntitiesEndpoint = `${config.baseUrl}/Participants.json`,
            searchEntities = function () {
                if (keyword() != null) {
                    var endpoint = "";
                    if(keywordProperty() === "IsReconcile") {
                        endpoint = `${config.baseUrl}/Participants.json?orderBy="${keywordProperty()}"&equalTo=${keyword()}`;
                    } else {
                        endpoint = `${config.baseUrl}/Participants.json?orderBy="${keywordProperty()}"&equalTo="${keyword()}"`;
                    }
                    loadEntities(endpoint);
                }
            },
            resetEntities = function () {
                keyword(null);
                loadEntities(defaultEntitiesEndpoint);
            },
            loadEntities = function (endpoint) {
                isBusy(true);
                return context.get(endpoint, true, {})
                    .done(function (result) {
                        console.log(result);
                        isBusy(false);
                        if (null != result) {
                            var results = $.map(result, function (item, i) {
                                item['Key'] = i;
                                return item;
                            });
                            entities(results);
                        } else {
                            //TODO:
                        }
                    }).fail(function (e) {
                        console.log(`${e.status} ${e.statusText} ${e.responseJSON.error}`);
                        isBusy(false);
                        router.navigate("/");
                    });
            },
            activate = function () {
                return loadEntities(defaultEntitiesEndpoint);
            },
            attached = function () { },
            compositionComplete = function () { },
            deactivate = function () { };

        return {
            isBusy: isBusy,
            entities: entities,
            keyword: keyword,
            keywordProperty: keywordProperty,
            searchEntities: searchEntities,
            resetEntities: resetEntities,
            activate: activate,
            attached: attached,
            compositionComplete: compositionComplete,
            deactivate: deactivate
        };
    });