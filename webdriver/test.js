var path = require('path');
var Nightmare = require('nightmare');
var should = require('chai').should();

describe('Nightmare demo', function () {
    this.timeout(15000); // Set timeout to 15 seconds, instead of the original 2 seconds

    var url = 'http://localhost/ngy2';

    describe('首页', function () {
        it('首页标题等于用户名', function (done) {
            new Nightmare({weak:false})
                .goto(url)
                .evaluate(function () {
                    return $('.hyzx h2').text();
                }, function (result) {
                    result.should.equal("行业资讯");
                    done();
                })
                .run();
        });
    });
});