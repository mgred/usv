load("@npm//@bazel/typescript:index.bzl", "ts_project")

def ts_build(name, outputs, **kwargs):
    for k, v in outputs.items():
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
