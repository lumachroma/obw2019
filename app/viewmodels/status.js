define(['knockout', 'schemas', 'durandal/system', 'durandal/app', 'plugins/router', 'services/datacontext', 'services/config'],
    function (ko, schemas, system, app, router, context, config) {

        var isBusy = ko.observable(false),
            key = ko.observable(),
            entity = ko.observable(new schemas.Participant(system.guid())),
            activate = function (keyId) {
                key(keyId);
                context.get(`${config.baseUrl}/Participants.json?orderBy="Phone"&equalTo="${key()}"`, true, {})
                    .done(function (result) {
                        //console.log(result);
                        if (!$.isEmptyObject(result)) {
                            isBusy(false);
                            var index = Object.keys(result)[0];
                            var p = result[index]
                            entity(schemas.Participant(p));
                            //console.log(ko.toJSON(entity));
                        } else {
                            context.get(`${config.baseUrl}/Participants.json?orderBy="Email"&equalTo="${key()}"`, true, {}).done(function (result2) {
                                //console.log(result2);
                                if (!$.isEmptyObject(result2)) {
                                    isBusy(false);
                                    var index = Object.keys(result2)[0];
                                    var p = result2[index]
                                    entity(schemas.Participant(p));
                                    //console.log(ko.toJSON(entity));
                                } else {
                                    app.showMessage(`Invalid Phone/Email: ${key()}`,
                                        config.applicationName, ["OK"])
                                        .done(function (result) {
                                            if (result == "OK") {
                                                router.navigate("/");
                                            }
                                        });
                                }
                            });
                        }
                    });
            },
            attached = function () { },
            compositionComplete = function () { },
            deactivate = function () {
                id(null);
            };

        return {
            key: key,
            entity: entity,
            isBusy: isBusy,
            activate: activate,
            attached: attached,
            compositionComplete: compositionComplete,
            deactivate: deactivate
        };
    });