# Third-party dependencies fetched by Bazel
# Unlike WORKSPACE, the content of this file is unordered.
# We keep them separate to make the WORKSPACE file more maintainable.

# Install the nodejs "bootstrap" package
# This provides the basic tools for running and packaging nodejs programs in Bazel
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

def fetch_dependencies():
    http_archive(
        name = "build_bazel_rules_nodejs",
        sha256 = "e328cb2c9401be495fa7d79c306f5ee3040e8a03b2ebb79b022e15ca03770096",
        urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.4.2/rules_nodejs-5.4.2.tar.gz"],
    )
