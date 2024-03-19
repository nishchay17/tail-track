import AnalyticsDashboard from "@/components/dashboard/analytics-dashboard";
import { MainNav } from "@/components/nav/main-nav";
import { mockTracker } from "@/config/mock";

function DemoPage() {
  return (
    <div className="container">
      <MainNav
        items={[{ title: "Home", href: "/" }]}
        className="justify-between items-center my-6"
      />
      <main className="mt-24">
        <p className="text-3xl font-medium mb-4">Demo page</p>
        <p className="text-lg mb-4">
          Cards with violet boarder are dymanic and are created from information
          meta data sent
        </p>
        <p className="text-lg mb-1">
          For example, sending country in meta data will create card with violet
          boarder with heading country
        </p>
        <code className="text-lg bg-violet-500/20 px-[5px] py-[1px] rounded-md border border-white/10">
          {"tailtrack('namespace', {country: 'india'})"}
        </code>
        <section className="mt-16">
          <AnalyticsDashboard trackingDays={7} tracks={mockTracker} />
        </section>
      </main>
    </div>
  );
}

export default DemoPage;
