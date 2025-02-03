import { useId } from 'react';

export function LocalTime({
  className,
  style,
  dateTime,
  options,
}: {
  className?: string;
  style?: React.CSSProperties;
  dateTime: Date;
  options?: Intl.DateTimeFormatOptions;
}) {
  const id = useId();
  return (
    <>
      <time
        id={id}
        className={className}
        style={style}
        dateTime={dateTime.toISOString()}
        data-options={options ? JSON.stringify(options) : undefined}
      >
        {dateTime.toLocaleString(undefined, options)}
      </time>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__patchLocalTime?.("${id}");`,
        }}
      />
    </>
  );
}

export function LocalTimeHelper() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__patchLocalTime=(id) => {
          const time = document.getElementById(id);
          if (time) {
            const options = time.getAttribute('data-options');
            time.textContent = new Date(time.dateTime).toLocaleString(undefined, options ? JSON.parse(options) : undefined);
          }
        }`,
      }}
    />
  );
}
