"use client";
import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function MuiRegistry({ children }: { children: React.ReactNode }) {
    const cache = React.useMemo(() => createCache({ key: "mui", prepend: true }), []);

    useServerInsertedHTML(() => (
        <style
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(" "),
            }}
        />
    ));

    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
