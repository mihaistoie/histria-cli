"use strict";
/// <reference path="../../typings/index.d.ts" />
var utils = require('../../src/core/utils');
var chai = require('chai');
describe("Utils", function () {
    it("equals", function () {
        var o1 = { a: 2, b: 3, c: [{ n: 1 }, { f: 6 }] };
        var o2 = { a: 2, b: 3, c: [{ n: 1 }, { f: 6 }] };
        chai.assert.equal(utils.equals(o1, o2), true);
    });
});
