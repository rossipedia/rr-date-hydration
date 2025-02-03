import { LocalTime } from '~/components/LocalTime';
import type { Route } from './+types/_.with-fix';

export function loader() {
  return {
    date: new Date(),
  };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h3>
        This page should <strong>NOT</strong>product a hydration error.
      </h3>
      <em>(It should also produce virtually no noticeable render flicker)</em>
      <p>
        The date is: <LocalTime dateTime={loaderData.date} />
      </p>
      <p>
        With Options:{' '}
        <LocalTime
          dateTime={loaderData.date}
          options={{
            dateStyle: 'full',
            timeStyle: 'full',
          }}
        />
      </p>
    </div>
  );
}
