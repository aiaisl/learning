/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/q/q.d.ts" />
process.stdin.resume();
process.on('SIGINT', function () {
    console.log('Got a SIGINT. Exiting');
    process.exit(0);
});
