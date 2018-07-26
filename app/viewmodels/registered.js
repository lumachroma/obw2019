define(['knockout', 'schemas', 'durandal/system', 'durandal/app', 'plugins/router', 'services/datacontext', 'services/config'],
    function (ko, schemas, system, app, router, context, config) {

        var isBusy = ko.observable(false),
            entities = ko.observableArray([]),
            activate = function () {
                isBusy(true);
                return context.get(`${config.baseUrl}/Participants.json`, true, {})
                    .done(function (result) {
                        console.log(result);
                        isBusy(false);
                        if (null != result) {
                            var results =  $.map(result, function(item, i){
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
            attached = function () { },
            compositionComplete = function () { },
            deactivate = function () { };

        return {
            isBusy: isBusy,
            entities: entities,
            activate: activate,
            attached: attached,
            compositionComplete: compositionComplete,
            deactivate: deactivate
        };
    });