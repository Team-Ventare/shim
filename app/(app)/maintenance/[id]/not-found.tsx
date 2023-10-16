import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find that request.</p>
      <p>
        View <Link href="/request">all requests.</Link>.
      </p>
    </div>
  );
}