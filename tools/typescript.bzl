load("@npm//@bazel/typescript:index.bzl", "ts_project")

VERSIONS = {
    "commonjs": "es6",
    "umd": "es6",
    "es2015": "es6",
}

def ts_build(name, **kwargs):
  for k, v in VERSIONS.items():
    ts_project(
        name = "%s.%s" % (name, k),
        out_dir = k,
        extends = ":tsconfig.json",
        tsconfig = {
            "compilerOptions": {
                "module": k,
                "target": v,
            },
        },
        **kwargs
    )
