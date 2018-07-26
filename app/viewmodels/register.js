define(['knockout', 'schemas', 'durandal/system', 'durandal/app', 'plugins/router', 'services/datacontext', 'services/config'],
    function (ko, schemas, system, app, router, context, config) {

        var isBusy = ko.observable(false),
            id = ko.observable(),
            entity = ko.observable(new schemas.Participant(system.guid())),
            activate = function (entityId) {
                id(entityId);
                if (!entityId || entityId === "0") {
                    entity(schemas.Participant(system.guid()));
                } else {
                    isBusy(true);
                    return context.get(`${config.baseUrl}/Participants/${id()}.json`, true, {})
                        .done(function (result) {
                            console.log(result);
                            isBusy(false);
                            if (null != result) {
                                entity(schemas.Participant(result));
                                //console.log(ko.toJSON(entity));
                            } else {
                                app.showMessage(`Invalid Participant: ${id()}`,
                                    config.applicationName, ["OK"])
                                    .done(function (result) {
                                        if (result == "OK") {
                                            router.navigate("/");
                                        }
                                    });
                            }                            
                        }).fail(function (e) {
                            console.log(`${e.status} ${e.statusText} ${e.responseJSON.error}`);
                            isBusy(false);
                            router.navigate("/");
                        });
                }
            },
            defultOperationEndpoint = function (json, endpoint, verb, successMessage) {
                isBusy(true);
                context.send(json, `${config.baseUrl}/${endpoint}`, verb)
                    .done(function (result) {
                        console.log(result);
                        isBusy(false);
                        app.showMessage(successMessage, config.applicationName, ["OK"])
                            .done(function (result) {
                                if (result == "OK") {
                                    router.navigate("registered");
                                }
                            });
                    }).fail(function (e) {
                        console.log(e.status);
                        console.log(e.statusText);
                        isBusy(false);
                    });
            },
            editEntity = function () {
                var data = ko.toJSON(entity);
                var endpoint = `/Participants/${id()}.json`;
                var msg = "Successfully edited.";
                //console.log(data);
                defultOperationEndpoint(data, endpoint, "PUT", msg);
            },
            addEntity = function () {
                var data = ko.toJSON(entity);
                var endpoint = `/Participants.json`;
                var msg = "Successfully added.";
                //console.log(data);
                defultOperationEndpoint(data, endpoint, "POST", msg);
            },
            deleteEntity = function () {
                var data = ko.toJSON(entity);
                var endpoint = `/Participants/${id()}.json`;
                var msg = "Successfully deleted.";
                //console.log(data);
                app.showMessage("Are you sure you want to delete?", config.application_name, ["Yes", "No"])
                    .done(function (result) {
                        if (result === "No") {
                            return
                        }
                        defultOperationEndpoint(data, endpoint, "DELETE", msg);
                    });
            },
            attached = function () { },
            compositionComplete = function () { },
            deactivate = function () {
                id(null);
            };

        return {
            id: id,
            entity: entity,
            isBusy: isBusy,
            addEntity: addEntity,
            editEntity: editEntity,
            deleteEntity: deleteEntity,
            activate: activate,
            attached: attached,
            compositionComplete: compositionComplete,
            deactivate: deactivate
        };
    });