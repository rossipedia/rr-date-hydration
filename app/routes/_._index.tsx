import type { Route } from './+types/_._index';

export function loader() {
  return {
    date: new Date(),
  };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h3>This page should product a hydration error.</h3>
      <span>The date is: {loaderData.date.toString()}</span>
    </div>
  );
}
