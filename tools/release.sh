#!/usr/bin/env bash

set -e

readonly NPM_COMMAND=${1:-publish}
readonly BAZEL=`which bazel`

if [ -z ${PACKAGE_VERSION+x} ]; then
  echo "PACKAGE_VERSION must be set"
  exit 1
fi

readonly PKG_NPM_LABELS=`$BAZEL query --output=label 'kind("pkg_npm", //...)'`

$BAZEL build --config=release $PKG_NPM_LABELS

for pkg in $PKG_NPM_LABELS ; do
  $BAZEL run --config=release -- ${pkg}.${NPM_COMMAND} --access public
done
