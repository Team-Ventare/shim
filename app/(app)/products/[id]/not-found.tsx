import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find that product.</p>
      <p>
        View <Link href="/products">all products.</Link>.
      </p>
    </div>
  );
}
