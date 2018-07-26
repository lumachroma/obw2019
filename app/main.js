﻿requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.4.0',
        'bootstrap': 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min',
        'jquery': 'https://code.jquery.com/jquery-3.3.1.min',
        'schemas': 'entitydefinition/schemas'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap'], function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'STAR OBW 2019';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function () {
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell', 'entrance');
    });
});

define('services/datacontext', [], function () {

    function send(json, url, verb) {
        var tcs = new $.Deferred();
        $.ajax({
            type: verb,
            data: json,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: tcs.reject,
            success: tcs.resolve
        });
        return tcs.promise();
    }

    function get(url, cache, headers) {
        var tcs = new $.Deferred();
        $.ajax({
            type: "GET",
            cache: cache,
            headers: headers,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: tcs.reject,
            success: tcs.resolve
        });
        return tcs.promise();
    }

    function post(json, url, headers) {
        var tcs = new $.Deferred();
        $.ajax({
            type: "POST",
            data: json,
            headers: headers,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: tcs.reject,
            success: tcs.resolve
        });
        return tcs.promise();
    }

    function put(json, url, headers) {
        var tcs = new $.Deferred();
        $.ajax({
            type: "PUT",
            data: json,
            headers: headers,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: tcs.reject,
            success: tcs.resolve
        });
        return tcs.promise();
    }

    function patch(json, url, headers) {
        var tcs = new $.Deferred();
        $.ajax({
            type: "PATCH",
            data: json,
            headers: headers,
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: tcs.reject,
            success: tcs.resolve
        });
        return tcs.promise();
    }

    function remove(url) {
        var tcs = new $.Deferred();
        $.ajax({
            type: "DELETE",
            data: "{}",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: tcs.reject,
            success: tcs.resolve
        });
        return tcs.promise();
    }

    return {
        send: send,
        get: get,
        post: post,
        put: put,
        patch: patch,
        remove: remove
    };
});

define('services/config', [], function () {
    return {
        baseUrl: "https://starobw-2019.firebaseio.com/",
        applicationName: "STAR OBW 2019",
    };
});