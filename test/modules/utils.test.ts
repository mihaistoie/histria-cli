/// <reference path="../../typings/index.d.ts" />
import {utils}  from '../../src/index';
import * as chai  from 'chai';

describe("Utils", function () {
  it("equals", function () {
    let o1 = { a: 2, b: 3, c: [{ n: 1 }, { f: 6 }] };
    let o2 = { a: 2, b: 3, c: [{ n: 1 }, { f: 6 }] };
    chai.assert.equal(utils.equals(o1, o2), true);
  });
});



