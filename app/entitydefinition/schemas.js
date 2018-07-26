define(['knockout'], function (ko) {

    var Participant = function (optionOrWebid) {

        var model = {
            ReceiptNumber: ko.observable(),
            Name: ko.observable(),
            Phone: ko.observable(),
            Email: ko.observable(),
            House: ko.observable(),
            Batch: ko.observable(),
            Note: ko.observable(),
            ModeOfPayment: ko.observable(),
            Id: ko.observable(),
            WebId: ko.observable(),

            addChildItem: function (list, type) {
                if (typeof type === "function") {
                    return function () {
                        list.push(new type(guid()));
                    };
                }
                return function () {
                    list.push(type);
                };
            },

            removeChildItem: function (list, obj) {
                return function () {
                    list.remove(obj);
                };
            }
        };

        if (typeof optionOrWebid === "object") {
            if (optionOrWebid.Id) {
                model.Id(optionOrWebid.Id);
            }
            if (optionOrWebid.ReceiptNumber) {
                model.ReceiptNumber(optionOrWebid.ReceiptNumber);
            }
            if (optionOrWebid.Name) {
                model.Name(optionOrWebid.Name);
            }
            if (optionOrWebid.Phone) {
                model.Phone(optionOrWebid.Phone);
            }
            if (optionOrWebid.Email) {
                model.Email(optionOrWebid.Email);
            }
            if (optionOrWebid.House) {
                model.House(optionOrWebid.House);
            }
            if (optionOrWebid.Batch) {
                model.Batch(optionOrWebid.Batch);
            }
            if (optionOrWebid.Note) {
                model.Note(optionOrWebid.Note);
            }
            if (optionOrWebid.ModeOfPayment) {
                model.ModeOfPayment(optionOrWebid.ModeOfPayment);
            }
        }

        if (optionOrWebid && typeof optionOrWebid === "string") {
            model.WebId(optionOrWebid);
        }

        return model;
    };

    return {
        Participant: Participant
    };

});