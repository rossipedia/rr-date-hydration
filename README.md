# Date / Time Hydration Hack

If you haven't run into SSR/Hydration issues with dates and times, count yourself lucky.

If you _have_, here's one potential method of addressing them:

Patch up the DOM _before_ React starts hydrating, so that you essentially trick
React into thinking that your date/time was SSR-ed using the browser's local
time zone.

> [!NOTE]
> This relies on the browser's built-in `Intl.DateTimeFormat` API, because it
> allows the helper shim to be super tiny. Using alternative date/time libraries
> such as `date-fns` is out of scope for this solution

## How to run

Make sure you start the app with a `TZ` environment variable set to something
other than your local timezone. For most people, you can just use:

```sh
$ TZ=UTC pnpm dev
```

If you happen to be in `UTC`, then just set it to something else:

```sh
$ TZ=America/New_York pnpm dev
```

Then open http://localhost:5173, which should show the hydration error.

When loading `/with-fix`, you should _not_ see the hydration error, but the
time should be in your local time instead of the timezone that you specified when starting the server.

## How it works

The hack is two parts:

1. The `LocalTime` component, which renders:
  - A `<time>` element (because semantic HTML rocks) that also includes serialized `Intl.DateTimeFormatOptions` in a `data-options` attribute, along with a unique `id`.
  - A small `<script>` element to patch up the `textContent` of the rendered `<time>` element using the following helper

2. A helper shim inserted into the document head in `root.tsx` that defines a `__patchLocalTime` function that will update the `textContent` of the element with the given `id` using the `Intl.DateTimeFormatOptions` that were serialized in the elements `data-options` attribute.
