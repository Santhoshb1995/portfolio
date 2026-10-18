import { ButtonLink, PageHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-page">
      <PageHeader eyebrow="404" title="This page didn't pass its tests.">
        <p>The link may be old or mistyped.</p>
      </PageHeader>
      <ButtonLink href="/" internal variant="primary">
        Back to home
      </ButtonLink>
    </div>
  );
}
