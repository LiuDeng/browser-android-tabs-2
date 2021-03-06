// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(async function() {
  TestRunner.addResult(`Verify javascript outline\n`);
  await TestRunner.loadModule('sources_test_runner');
  await TestRunner.showPanel('sources');

  var test = SourcesTestRunner.testJavascriptOutline;

  TestRunner.markStep('testAsyncFunction');
  await test('async function foo() { }');

  TestRunner.markStep('testAsyncArrowFunction');
  await test('var sum = async (x, y) => x + y;');

  TestRunner.markStep('testGeneratorFunction');
  await test('function* foo() { }');

  TestRunner.markStep('testMismatchBrackets');
  await test(`
function foo(a, b) {
    if (a > b) {
        return a;
}

function bar(eee) {
    foo(eee, 2 * eee);
}
`);

  TestRunner.markStep('testSyntaxError');
  await test(`
function notAGenerator(a, b) {
    yield 10;
}`);

  TestRunner.completeTest();
})();
